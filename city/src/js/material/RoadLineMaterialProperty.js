import * as Cesium from 'cesium'
import Gsap from 'gsap'

// 轨迹线效果
class RoadLineMaterialProperty {
    constructor(name = 'roadline') {
        this.name = name
        this.definitionChanged = new Cesium.Event()
        this.typeName = 'roadLineMaterial'
        Cesium.Material._materialCache.addMaterial(this.typeName, {
            fabric: {
                type: this.typeName,
                uniforms: {
                    uTime: 0,
                    image: require('@/texture/spriteline1.png'),
                },
                source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        // 生成默认的基础材质
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        
                        // 获取st（UV）
                        vec2 st = materialInput.st;
                        // 根据UV采样颜色
                        vec4 color = texture2D( image, vec2( fract(st.s - uTime), st.t ) );
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
            // yoyo: true,
            ease: 'linear'
        })
    }

    equals(other) {
        // 判断两个材质是否相等
        return other instanceof RoadLineMaterialProperty && this.name === other.name
    }

    getType() {
        return this.typeName
    }

    getValue(time, result) {
        result.uTime = this.params.uTime
        return result
    }

}


export default RoadLineMaterialProperty
