import * as Cesium from 'cesium'

// 六边形光波扩散特效
class LightSpreadMaterialProperty {
    constructor(name = 'radar') {
        this.name = name
        this.definitionChanged = new Cesium.Event()
        this.typeName = 'lightSpreadMaterial'
        Cesium.Material._materialCache.addMaterial(this.typeName, {
            fabric: {
                type: this.typeName,
                uniforms: {
                    image: require('@/texture/hexagon.png'),
                },
                source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        // 生成默认的基础材质
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        
                        // 获取st（UV）
                        vec2 st = materialInput.st;
                        
                        // 根据UV取色
                        vec4 color = texture2D(image, st);
                        
                        material.diffuse = color.rgb;
                        material.alpha = color.a;
                        
                        return material;
                    }
                `
            }
        })
    }

    equals(other) {
        // 判断两个材质是否相等
        return other instanceof LightSpreadMaterialProperty && this.name === other.name
    }

    getType() {
        return this.typeName
    }

    getValue(time, result) {
        return result
    }

}


export default LightSpreadMaterialProperty
