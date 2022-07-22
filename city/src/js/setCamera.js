import * as Cesium from 'cesium'


function setCamera(viewer) {

    // 广州塔
    const postion = Cesium.Cartesian3.fromDegrees(
        // 经度
        113.3301,
        // 纬度
        23.0991,
        // 高度
        1500
    )

    viewer.camera.flyTo({
        destination: postion,
        orientation: {
            heading: Cesium.Math.toRadians(-45),
            pitch: Cesium.Math.toRadians(-30),
            roll: 0,
        },
        duration: 2,
    })

}

export default setCamera

