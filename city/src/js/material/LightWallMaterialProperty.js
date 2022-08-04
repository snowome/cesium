import * as Cesium from 'cesium'
import Gsap from 'gsap'

// 六边形光波扩散特效
class LightWallMaterialProperty {
    constructor(name = 'lightWall') {
        this.name = name
        this.definitionChanged = new Cesium.Event()
        this.typeName = 'lightWallMaterial'
        Cesium.Material._materialCache.addMaterial(this.typeName, {
            fabric: {
                type: this.typeName,
                uniforms: {
                    uTime: 0,
                    image: require('@/texture/spriteline2.png'),
                },
                source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        // 生成默认的基础材质
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        
                        // 获取st（UV）
                        vec2 st = materialInput.st;
                        
                        // 根据UV取色 fract函数，保留小数部分
                        // vec4 color = texture2D(image, vec2(fract(st.x - uTime), st.y));
                        vec4 color = texture2D(image, vec2(fract(st.y - uTime), st.x));
                        
                        material.diffuse = color.rgb;
                        material.alpha = color.a;
                        
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
            duration: 1,
            repeat: -1,
            ease: "linear",
        })
    }

    equals(other) {
        // 判断两个材质是否相等
        return other instanceof LightWallMaterialProperty && this.name === other.name
    }

    getType() {
        return this.typeName
    }

    getValue(time, result) {
        result.uTime = this.params.uTime
        return result
    }

}


export default LightWallMaterialProperty
