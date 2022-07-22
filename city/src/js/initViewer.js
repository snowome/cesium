import * as Cesium from 'cesium'

export default function initViewer() {

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
    })

    // 去掉左下角的logo
    viewer.cesiumWidget.creditContainer.style.display = 'none'

    return viewer

}
