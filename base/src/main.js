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

const viewer = new Cesium.Viewer(document.body, {
    // 信息框 是否显示
    // infoBox: false,
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
    timeline: true,
    // 全屏按钮 是否显示
    fullscreenButton: false,
    // 直接显示动画
    shouldAnimate: true,
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





