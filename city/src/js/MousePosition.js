import * as Cesium from 'cesium'

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
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    }
}

export default MousePosition
