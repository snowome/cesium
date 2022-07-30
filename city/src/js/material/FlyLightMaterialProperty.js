import * as Cesium from 'cesium'
import Gsap from 'gsap'

let typeNum = 0
class FlyLightMaterialProperty {
    constructor(color = new Cesium.Color(0.7, 0.6, 1.0, 1.0)) {
        this.color = color
        typeNum++
        this.definitionChanged = new Cesium.Event()
        this.typeName = `flyLightMaterial${typeNum}`
        Cesium.Material._materialCache.addMaterial(this.typeName, {
            fabric: {
                type: this.typeName,
                uniforms: {
                    uTime: 0,
                    color: this.color,
                },
                source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        // 生成默认的基础材质
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        // 获取st
                        vec2 st = materialInput.st;
                        // 获取当前帧数，10秒内变化0-1
                        float time = fract(czm_frameNumber / (60.0 * 10.0));
                        // 在0-1的基础上又加了10%
                        time = time * (1.0 + 0.1);
                        // 平滑过渡函数
                        // smoothstep(edge0, edge1, value);
                        // edge0 = 8; edge1 = 10;
                        // 参数3：当前值,==7 , result = 0
                        // 参数3：当前值,==9 , result = 0.5
                        // 参数3：当前值,==10 , result = 1
                        float alpha = smoothstep(time - 0.1, time, st.s) * step(-time, -st.s);
                        alpha += 0.05;
                        material.alpha = alpha;
                        material.diffuse = color.rgb;
                        return material;
                    }
                `
            }
        })
        this.params = {
            uTime: 0,
        }
        Gsap.to(this.params, {
            uTime: 1,
            duration: 2,
            repeat: -1,
            yoyo: true,
        })
    }
    equals(other) {
        // 判断两个材质是否相等
        return other instanceof FlyLightMaterialProperty && this.color === other.color
    }
    getType() {
        return this.typeName
    }
    getValue(time, result) {
        result.uTime = this.params.uTime
        return result
    }

}


export default FlyLightMaterialProperty
