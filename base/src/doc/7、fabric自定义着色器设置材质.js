import * as Cesium from 'cesium'
import Gsap from 'gsap'


// 第一步：创建几何体
const rectGeometry = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(
        // 西边的经度
        115,
        // 南边维度
        20,
        // 东边经度
        135,
        // 北边维度
        30
    ),
    // 距离表面距离
    height: 0,
    // vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
})

// 第二步：创建几何体实例
const instance = new Cesium.GeometryInstance({
    id: 'redRect',
    geometry: rectGeometry,
    attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.RED.withAlpha(0.5)
        )
    }
})

// 第三步：设置外观
// const material = new Cesium.Material({
//     fabric: {
//         type: 'Color',
//         uniforms: {
//             color: new Cesium.Color(1.0, 0.0, 0.0, 0.5)
//         }
//     }
// })
// const material = new Cesium.Material({
//     fabric: {
//         type: 'Image',
//         uniforms: {
//             image: require('@/texture/logo.png'),
//             repeat: new Cesium.Cartesian2(2, 2),
//         }
//     }
// })
const defaultMaterial = `默认
czm_material czm_getMaterial(czm_materialInput materialInput) {
    czm_material material = czm_getDefaultMaterial(materialInput);
    return material;
}
`
const material = new Cesium.Material({
    fabric: {
        uniforms: {
            uTime: 0.0,
        },
        source: `
            czm_material czm_getMaterial(czm_materialInput materialInput) {
                czm_material material = czm_getDefaultMaterial(materialInput);
                float strength = mod((materialInput.s + uTime) * 10.0, 1.0);
                material.diffuse = vec3(strength, 0.0, 0.0);
                return material;
            }
        `
    }
})
Gsap.to(material.uniforms, {
    uTime: 1.0,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'linear',
})
// console.log(material)
// console.log(material.shaderSource)
// EllipsoidSurfaceAppearance 确定几何体都是与地球的椭球体平行，平行可以在计算大量顶点属性的时候节省内存。
const appearance = new Cesium.EllipsoidSurfaceAppearance({
    material: material
})
// console.log(appearance._vertexShaderSource)
// console.log(appearance._fragmentShaderSource)


// 第四步：创建图元
const primitive = new Cesium.Primitive({
    geometryInstances: instance,  // 可以是多个，用数组[instance1、instance2]
    appearance: appearance,
})

// 第五步：添加到viewer
viewer.scene.primitives.add(primitive)
