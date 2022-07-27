import * as Cesium from 'cesium'

// 添加3d建筑
const osmBuilding = viewer.scene.primitives.add(
    new Cesium.createOsmBuildings()
)

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
// PerInstanceColorAppearance是使用instance的颜色去着色
// const appearance = new Cesium.PerInstanceColorAppearance({
//     flat: true
// })

// 颜色
// const material = new Cesium.Material.fromType('Color', {
//     color: Cesium.Color.SKYBLUE.withAlpha(0.5)
// })
// 图片
// const material = new Cesium.Material.fromType('Image', {
//     image: require('@/texture/logo.png'),
//     repeat: new Cesium.Cartesian2(2, 2),
// })
// 漫反射贴图
// const material = new Cesium.Material.fromType('DiffuseMap', {
//     image: require('@/texture/logo.png'),
// })
// 网格
// const material = new Cesium.Material.fromType('Grid', {
//     color: Cesium.Color.RED,
//     cellAlpha: 0.2,
//     lineCount: new Cesium.Cartesian2(8, 8),
//     lineThickness: new Cesium.Cartesian2(2, 2),
// })
// 水
const material = new Cesium.Material.fromType('Water', {
    baseWaterColor: new Cesium.Color.fromCssColorString('#1a507d'),
    normalMap: './_assets/cesium/Assets/Textures/waterNormals.jpg',
})

// const appearance = new Cesium.MaterialAppearance({
//     material: material
// })

// EllipsoidSurfaceAppearance 确定几何体都是与地球的椭球体平行，平行可以在计算大量顶点属性的时候节省内存。
const appearance = new Cesium.EllipsoidSurfaceAppearance({
    material: material
})



// 第四步：创建图元
const primitive = new Cesium.Primitive({
    geometryInstances: instance,  // 可以是多个，用数组[instance1、instance2]
    appearance: appearance,
})

// 第五步：添加到viewer
viewer.scene.primitives.add(primitive)


// 动态修改图元颜色
// setInterval(() => {
//     const attribute = primitive.getGeometryInstanceAttributes('redRect')
//     attribute.color = Cesium.ColorGeometryInstanceAttribute.toValue(
//         Cesium.Color.fromRandom({
//             alpha: 0.5,
//         })
//     )
// }, 2000)

// 点击拾取
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
handler.setInputAction(event => {
    const pickedObject = viewer.scene.pick(event.position)
    if (Cesium.defined(pickedObject)) {
        if (typeof pickedObject.id === 'string') {  // 排除entities的物体
            const attribute = primitive.getGeometryInstanceAttributes(pickedObject.id)
            attribute.color = Cesium.ColorGeometryInstanceAttribute.toValue(
                Cesium.Color.fromRandom({
                    alpha: 0.5,
                })
            )
        }
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
