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
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
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
const appearance = new Cesium.PerInstanceColorAppearance({
    flat: true
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
