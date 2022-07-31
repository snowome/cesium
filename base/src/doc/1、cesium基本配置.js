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

const sky_px = require('@/texture/sky/px.jpg')
const sky_nx = require('@/texture/sky/nx.jpg')
const sky_py = require('@/texture/sky/py.jpg')
const sky_ny = require('@/texture/sky/ny.jpg')
const sky_pz = require('@/texture/sky/pz.jpg')
const sky_nz = require('@/texture/sky/nz.jpg')

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
    // 直接显示动画
    shouldAnimate: true,
    // 天空盒
    skyBox: new Cesium.SkyBox({
        sources: {
            positiveX : sky_px,
            negativeX : sky_nx,
            positiveY : sky_py,
            negativeY : sky_ny,
            positiveZ : sky_pz,
            negativeZ : sky_nz
        }
    })
})

// 去掉左下角的logo
viewer.cesiumWidget.creditContainer.style.display = 'none'

// 打开光照
// viewer.scene.globe.enableLighting = true
// 取消天空盒显示
// viewer.scene.skyBox.show = false
// 设置背景为黑色
// viewer.scene.backgroundColor = Cesium.Color.BLACK
// 设置抗锯齿
// viewer.scene.postProcessStages.fxaa.enabled = true

// 设置沙箱允许使用js
var iframe = document.getElementsByClassName("cesium-infoBox-iframe")[0];
iframe.setAttribute(
    "sandbox",
    "allow-same-origin allow-scripts allow-popups allow-forms"
);
iframe.setAttribute("src", "");
