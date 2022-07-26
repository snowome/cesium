import * as Cesium from 'cesium'


function setCamera(viewer) {

    // 广州塔
    const position = Cesium.Cartesian3.fromDegrees(
        // 经度
        113.3301,
        // 纬度
        23.0991,
        // 高度
        1000
    )

    // 让相机飞往某个地方
    viewer.camera.flyTo({
        // 指定相机位置
        destination: position,
        // 指定相机视角
        orientation: {
            // 指定相机的朝向,偏航角
            heading: Cesium.Math.toRadians(-45),
            // 指定相机的俯仰角,0度是竖直向上,-90度是向下
            pitch: Cesium.Math.toRadians(-20),
            // 指定相机的滚转角,翻滚角
            roll: 0,
        },
        duration: 2,
    })

}

export default setCamera

