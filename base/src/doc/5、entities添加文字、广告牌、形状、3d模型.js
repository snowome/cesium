import * as Cesium from 'cesium';

var position2 = Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 1500);

// 瞬间到达指定位置，视角
viewer.camera.setView({
    // 指定相机位置
    destination: position2,
    // 指定相机视角
    orientation: {
        // 指定相机的朝向,偏航角
        heading: Cesium.Math.toRadians(0),
        // 指定相机的俯仰角,0度是竖直向上,-90度是向下
        pitch: Cesium.Math.toRadians(-90),
        // 指定相机的滚转角,翻滚角
        roll: 0,
    }
})

// 创建一个点
const point = viewer.entities.add({
    // 定位点
    position: Cesium.Cartesian3.fromDegrees(113.31915, 23.109, 550),
    point: {
        pixelSize: 10,
        color: Cesium.Color.RED,
        outlineWidth: 4,
        outlineColor: Cesium.Color.WHITE,
    }
})

// 创建文字标签和广告牌
const label =  viewer.entities.add({
    // 定位点
    position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 600),
    // 文字标签
    label: {
        text: '广州塔',
        font: "24px sans-serif",
        fillColor: Cesium.Color.BLACK,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        // FILL填充文字，OUTLINE勾勒标签，FILL_AND_OUTLINE填充文字和勾勒标签
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        // 设置文字的偏移量
        pixelOffset: new Cesium.Cartesian2(0, -24),
        // 设置文字的显示位置,LEFT /RIGHT /CENTER
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        // 设置文字的显示位置
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
})

// 广告牌
const billboard = viewer.entities.add({
    // 定位点
    position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 600),
    // 广告牌
    billboard: {
        image: require('@/texture/gzt.png'),
        width: 50,
        height: 50,
        // 设置广告牌的显示位置
        verticalOrigin: Cesium.VerticalOrigin.TOP,
        // 设置广告牌的显示位置
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    }
})

// 添加3d模型
const airPlane = viewer.entities.add({
    name: 'airPlane',
    position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 800),
    model: {
        uri: require('@/texture/model/Air.glb'),
        // 设置飞机的最小像素
        minimumPixelSize: 120,
        // 设置飞机的轮廓
        silhouetteSize: 5,
        // 设置轮廓的颜色
        silhouetteColor: Cesium.Color.WHITE,
        // 设置相机距离模型多远的距离显示
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 20000),
    }
})
