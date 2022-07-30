import * as Cesium from 'cesium'

const position = Cesium.Cartesian3.fromDegrees(116.393428, 39.90923, 1000)

// 相机追踪运动的问题
// viewer.trackedEntity = planeEntity

// 瞬间到达指定位置，视角
// viewer.camera.setView({
//     // 指定相机位置
//     destination: position,
//     // 指定相机视角
//     orientation: {
//         // 指定相机的朝向,偏航角
//         heading: Cesium.Math.toRadians(0),
//         // 指定相机的俯仰角,0度是竖直向上,-90度是向下
//         pitch: Cesium.Math.toRadians(-30),
//         // 指定相机的滚转角,翻滚角
//         roll: 0,
//     }
// })

// 让相机飞往某个地方
// viewer.camera.flyTo({
//     // 指定相机位置
//     destination: position,
//     // 指定相机视角
//     orientation: {
//         // 指定相机的朝向,偏航角，绕Y轴旋转
//         heading: Cesium.Math.toRadians(0),
//         // 指定相机的俯仰角,0度是竖直向上,-90度是向下
//         pitch: Cesium.Math.toRadians(-30),
//         // 指定相机的滚转角,翻滚角
//         roll: 0,
//     },
//     duration: 2,
// })


// 通过按键移动相机
document.addEventListener('keydown', e => {
    // 获取相机离地面的高度
    const height = viewer.camera.positionCartographic.height
    const moveRate = height / 100
    if (e.key === 'w') {
        // 向前移动相机
        viewer.camera.moveForward(moveRate)
    } else if (e.key === 's') {
        // 向后移动相机
        viewer.camera.moveBackward(moveRate)
    } else if (e.key === 'a') {
        // 向左移动相机
        viewer.camera.moveLeft(moveRate)
    } else if (e.key === 'd') {
        // 向右移动相机
        viewer.camera.moveRight(moveRate)
    } else if (e.key === 'q') {
        // 向左旋转相机
        viewer.camera.lookLeft(Cesium.Math.toRadians(0.1))
    } else if (e.key === 'e') {
        // 向右旋转相机
        viewer.camera.lookRight(Cesium.Math.toRadians(0.1))
    } else if (e.key === 'r') {
        // 向上旋转相机
        viewer.camera.lookUp(Cesium.Math.toRadians(0.1))
    } else if (e.key === 'f') {
        // 向下旋转相机
        viewer.camera.lookDown(Cesium.Math.toRadians(0.1))
    } else if (e.key === 'g') {
        // 向左逆时针翻滚
        viewer.camera.twistLeft(Cesium.Math.toRadians(0.1))
    } else if (e.key === 'h') {
        // 向右顺时针翻滚
        viewer.camera.twistRight(Cesium.Math.toRadians(0.1))
    }
})
