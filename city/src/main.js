import * as Cesium from 'cesium'
import '@/_assets/cesium/Widgets/widgets.css'
import CesiumNavigation from 'cesium-navigation-es6'

import '@/css/common.scss'

import '@/js/initCesium.js'
import initViewer from '@/js/initViewer.js'
import camera from '@/js/camera.js'
import MousePosition from '@/js/MousePosition.js'
import modifyMap from '@/js/modifyMap.js'
import modifyBuild from '@/js/modifyBuild.js'
import LightCone from '@/js/lightCone.js'
import FlyLight from '@/js/FlyLight.js'
import RoadLine from '@/js/RoadLine.js'
import RadarLight from '@/js/RadarLight.js'
import LightSpead from '@/js/LightSpead.js'
import LightWall from '@/js/LightWall.js'
import ParticleLight from '@/js/ParticleLight.js'


const viewer = initViewer()

// 设置相机到广州塔
camera(viewer)

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
modifyMap(viewer)

// 修改建筑的颜色
modifyBuild(viewer)

// 添加动态的光锥
new LightCone(viewer)

// 上升流光飞线
new FlyLight(viewer)

// 道路飞线
new RoadLine(viewer)

// 雷达
new RadarLight(viewer)

// 六边形光波扩散特效
new LightSpead(viewer)

// 区域发光的墙
new LightWall(viewer)

// 烟花粒子
new ParticleLight(viewer, Cesium.Color.RED)
new ParticleLight(viewer, Cesium.Color.AQUA)
new ParticleLight(viewer, Cesium.Color.GREEN)
