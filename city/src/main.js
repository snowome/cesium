import * as Cesium from 'cesium'
import '@/_assets/cesium/Widgets/widgets.css'
import CesiumNavigation from 'cesium-navigation-es6'

import '@/css/common.scss'

import '@/js/initCesium.js'
import initViewer from '@/js/initViewer.js'
import setCamera from '@/js/setCamera.js'
import MousePosition from '@/js/MousePosition.js'
import modifyMap from '@/js/modifyMap.js'
import modifyBuild from '@/js/modifyBuild.js'


const viewer = initViewer()

// 设置相机到广州塔
setCamera(viewer)

// 获取鼠标所在位置的经纬度
new MousePosition(viewer)

// 初始化导航罗盘
new CesiumNavigation(viewer, {
    // 用于启用或禁用罗盘
    enableCompass: true,
    // 用于启用或禁用缩放控件
    enableZoomControls: true,
    // 用于启用或禁用指南针外环
    enableCompassOuterRing: true,
    // 用于启用或禁用距离图例
    enableDistanceLegend: true
})

// 修改地图的底色
// modifyMap(viewer)

// 修改建筑的颜色
modifyBuild(viewer)
