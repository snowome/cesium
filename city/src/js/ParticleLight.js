import * as Cesium from 'cesium'

class ParticleLight {
    constructor(viewer, color = Cesium.Color.WHITE) {
        // 创建 box entity
        this.boxEntity = viewer.entities.add({
            name: 'box',
            position: new Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 250),
            box: {
                // 长、宽、高
                dimensions: new Cesium.Cartesian3(100, 100, 500),
                material: Cesium.Color.RED.withAlpha(0),
            }
        })
        const particleSystem = new Cesium.ParticleSystem({
            // 粒子纹理
            image: require('@/texture/smoke.png'),
            // 粒子图像大小
            imageSize: new Cesium.Cartesian2(20, 20),
            // 粒子图像大小随机
            minimumImageSize: new Cesium.Cartesian2(10, 10),
            maximumImageSize: new Cesium.Cartesian2(30, 30),
            // 开始的时候粒子的大小
            startScale: 0.1,
            // 结束的时候粒子的大小
            endScale: 2.0,
            // 设置开始的颜色
            startColor: color,
            // 设置结束的颜色
            endColor: Cesium.Color.WHITE.withAlpha(0.5),
            // 速度，米/秒
            // speed: 5.0,
            // 随机的发射速度
            minimumSpeed: 1.0,
            maximumSpeed: 10.0,
            // 设置发射器
            // emitter: new Cesium.CircleEmitter(100),    // 1000参数是圆的半径，这里指发射的范围
            emitter: new Cesium.BoxEmitter(new Cesium.Cartesian3(250, 250, 800)),
            // 发射率，设置每秒产生粒子数量
            emissionRate: 3,
            // 粒子的生命周期，秒
            lifetime: 5.0,
            // 设置粒子发射的位置
            modelMatrix: this.boxEntity.computeModelMatrix(
                viewer.clock.currentTime,
                new Cesium.Matrix4(),
            ),
        })

        viewer.scene.primitives.add(particleSystem)
    }
}

export default ParticleLight
