import * as Cesium from 'cesium'
import '@/_assets/cesium/Widgets/widgets.css'

import '@/css/common.scss'

import {CESIUM_TOKEN} from '@/config.js'

Cesium.Ion.defaultAccessToken = CESIUM_TOKEN

window.CESIUM_BASE_URL = './_assets/cesium/'

// 设置相机默认视角
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
    // 西经
    73.33,
    // 南纬
    3.51,
    // 东经
    135.05,
    // 北纬
    53.33,
)

const viewer = new Cesium.Viewer(document.body, {
    // 信息框 是否显示
    infoBox: false,
    // 搜索框 是否显示
    geocoder: false,
    // Home 是否显示
    homeButton: false,
    // 2d、3d、2.5d 显示模式 是否显示
    sceneModePicker: false,
    // 地图影像 切换 是否显示
    baseLayerPicker: false,
    // 帮助按钮 是否显示
    navigationHelpButton: false,
    // 左下角 动画控制 是否显示
    animation: false,
    // 底部 时间轴 是否显示
    timeline: false,
    // 全屏按钮 是否显示
    fullscreenButton: false,
    // 天地图 https://www.tianditu.gov.cn/
    // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
            // 矢量地图
            // url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=30d07720fa76f07732d83c748bb84211",
            // 影像地图
        // url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=30d07720fa76f07732d83c748bb84211",
        // layer: "tdtBasicLayer",
        // style: "default",
        // format: "image/jpeg",
        // tileMatrixSetID: "GoogleMapsCompatible",
    // }),
})

// 去掉左下角的logo
viewer.cesiumWidget.creditContainer.style.display = 'none'

// const position = Cesium.Cartesian3.fromDegrees(116.393428, 39.90923, 1000)
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

// 添加3d建筑
const osmBuilding = viewer.scene.primitives.add(
    new Cesium.createOsmBuildings()
)

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
