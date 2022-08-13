import * as Cesium from 'cesium'

// 屏幕坐标系统，二维的笛卡尔坐标系，Cartesian2 类型
// 地理坐标系统，WGS-84坐标系，Cartographic 类型：经度，纬度，高度
// 笛卡尔空间直角坐标系，Cartesian3 类型

// 角度转弧度
const radians = Cesium.Math.toRadians(90)
// 弧度转角度
const degrees = Cesium.Math.toDegrees(2 * Math.PI)

// 将 经纬度 转为 笛卡尔空间直角坐标
const cartesian3 = Cesium.Cartesian3.fromDegrees(
    // 经度
    89.5,
    // 纬度
    20.4,
    // 高度
    100
)

// 将 笛卡尔空间直角坐标 转为 经纬度
const cartographic = Cesium.Cartographic.fromCartesian(cartesian3)  // 返回的经纬度是一个弧度，需要转换为度数
const longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2)
const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2)
const height = cartographic.height
console.log(`经度：${longitude} 纬度：${latitude} `)

// 屏幕坐标和 笛卡尔空间直角坐标系 互转
class MousePosition {
    constructor(viewer) {
        this.divDom = document.createElement("div");
        this.divDom.style.cssText = `
            position: fixed;
            bottom:0;
            right:0;
            width:200px;
            height:40px;
            background-color: rgba(0,0,0,0.5);
            color: #fff;
            font-size: 14px;
            line-height: 40px;
            text-align: center;
            z-index: 100;
        `;
        document.body.appendChild(this.divDom);
        // 监听塑标移动事件
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
        handler.setInputAction(event => {
            // 获取鼠标的坐标
            const cartesian3 = viewer.camera.pickEllipsoid(event.endPosition, viewer.scene.globe.ellipsoid)
            if (cartesian3) {
                // 转换成经纬度
                const cartographic = Cesium.Cartographic.fromCartesian(cartesian3)
                const longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2)
                const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2)
                const height = cartographic.height
                this.divDom.innerHTML = `经度：${longitude} 纬度：${latitude} `;

                // 笛卡尔空间直角坐标系 转为屏幕坐标
                // const cartesian2 = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, cartesian3)
                // console.log('window position：', cartesian2)
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    }
}
