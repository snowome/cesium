import * as Cesium from 'cesium'

class CustomMaterialPropery {
    constructor() {
        this.definitionChanged = new Cesium.Event()
        Cesium.Material._materialCache.addMaterial("CustomMaterial", {
            fabric: {
                type: "CustomMaterial",
                uniforms: {
                    uTime: 0,
                },
                source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        // 生成默认的基础材质
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        material.diffuse = vec3(materialInput.st, uTime);
                        return material;
                    }
                `,
            },
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

    getType() {
        // 返回材质类型
        return "CustomMaterial";
    }

    getValue(time, result) {
        // // console.log(result, time);
        // let t = performance.now() / 1000;
        // t = t % 1;
        // console.log(t);
        // result.uTime = t;
        result.uTime = this.params.uTime;
        // 返回材质值
        return result;
    }
}

const material = new CustomMaterialPropery()

const rectangle = viewer.entities.add({
    id: "entityRect",
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(
            // 西边的经度
            90,
            // 南边维度
            20,
            // 东边经度
            110,
            // 北边维度
            30
        ),
        // material: Cesium.Color.RED.withAlpha(0.5),
        material: material,
    },
})
