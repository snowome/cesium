import * as Cesium from 'cesium'

export default function initViewer() {

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
        animation: false,
        // 直接显示动画
        shouldAnimate: true,
        // 底部 时间轴 是否显示
        timeline: false,
        // vr模式，2个地球
        vrButton: false,
        // 是否显示选取指示器组件：在地图中选中一个实体会出现一个绿色的包围框
        selectionIndicator: false,
        // 全屏按钮 是否显示
        fullscreenButton: false,
        // 2d、2.5D使用的地图投影：WebMercatorProjection是WGS-84坐标系，Cartographic 类型：经度，纬度，高度
        mapProjection: new Cesium.WebMercatorProjection(),
    })

    // viewer.scene.globe.enableLighting = true
    // 取消天空盒显示
    // viewer.scene.skyBox.show = false
    // 设置背景为黑色
    // viewer.scene.backgroundColor = Cesium.Color.BLACK
    // 设置抗锯齿
    // viewer.scene.postProcessStages.fxaa.enabled = true

    // 去掉左下角的logo
    viewer.cesiumWidget.creditContainer.style.display = 'none'

    return viewer

}
