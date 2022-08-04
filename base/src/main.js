import * as Cesium from 'cesium'
import Gsap from 'gsap'
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
window.screen.orientation
    .lock("portrait")
    .then(
        success => console.log(success),
        failure => console.log(failure)
    )

const viewer = new Cesium.Viewer(document.body, {
    // 信息框 是否显示
    infoBox: false,
    // 搜索框 是否显示
    geocoder: false,
    // 首页位置，点击之后跳转到默认视角 是否显示
    homeButton: false,
    // 选择视角的模式：2d、3d、2.5d 显示模式 是否显示
    sceneModePicker: false,
    // 图层选择器，地图影像、地形选择 是否显示
    baseLayerPicker: false,
    // 帮助按钮 是否显示
    navigationHelpButton: false,
    // 如果显示帮助按钮，则帮助说明是否展开
    navigationInstructionsInitiallyVisible: false,
    // 左下角 动画控制 是否显示
    animation: true,
    // 直接显示动画
    shouldAnimate: true,
    // 底部 时间轴 是否显示
    timeline: true,
    // vr模式，2个地球
    vrButton: false,
    // 是否显示选取指示器组件：在地图中选中一个实体会出现一个绿色的包围框
    selectionIndicator: false,
    // 全屏按钮 是否显示
    fullscreenButton: true,
    // 2d、2.5D使用的地图投影：WebMercatorProjection是WGS-84坐标系，Cartographic 类型：经度，纬度，高度
    mapProjection: new Cesium.WebMercatorProjection(),
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
    terrainProvider: new Cesium.CesiumTerrainProvider({
        url: './_assets/terrains/gz'
    }),
})

// 去掉左下角的logo
viewer.cesiumWidget.creditContainer.style.display = 'none'


const position = Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 600)


// 瞬间到达指定位置，视角
viewer.camera.setView({
    // 指定相机位置
    destination: position,
    // 指定相机视角
    orientation: {
        // 指定相机的朝向,偏航角
        heading: Cesium.Math.toRadians(0),
        // 指定相机的俯仰角,0度是竖直向上,-90度是向下
        pitch: Cesium.Math.toRadians(-30),
        // 指定相机的滚转角,翻滚角
        roll: 0,
    }
})
