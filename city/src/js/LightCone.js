import * as Cesium from 'cesium'
import Gsap from 'gsap'

class LightCone {
    constructor(viewer) {
        this.params = {
            height: 700,
            degress: 0,     // 偏航角，是Y轴
        }
        // 设置模型位置矩阵
        this.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
            // 位置
            Cesium.Cartesian3.fromDegrees(113.3191, 23.109, this.params.height),
            // 模型旋转情况
            new Cesium.HeadingPitchRoll(this.params.degress, 0, 0)
        )
        // 添加gltf模型
        this.model = viewer.scene.primitives.add(
            new Cesium.Model.fromGltf({
                url: require('@/texture/pyramid.glb'),
                // 默认显示
                show: true,
                // 放大200倍
                scale: 200,
                // 最小的像素
                minimumPixelSize: 12,
                // 最大的放大比例
                maximumScale: 20000,
                // 是否允许倍点击
                allowPicking: false,
                // 是否显示debug的边框
                debugShowBoundingVolume: false,
                // 是否显示debug的线框
                debugWireframe: false,
                // 颜色
                color: Cesium.Color.YELLOW.withAlpha(0.5),
                // 设置颜色的混合模式
                colorBlendMode: Cesium.ColorBlendMode.MIX,
                // 设置模型的位置矩阵
                modelMatrix: this.modelMatrix,
            })
        )

        this.animate()

    }
    // 上下运动
    animate() {
        Gsap.to(this.params, {
            height: 800,
            degress: Math.PI,
            yoyo: true,
            repeat: -1,
            duration: 1,
            ease: 'power1.inOut',
            onUpdate: () => {
                this.model.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
                    // 位置
                    Cesium.Cartesian3.fromDegrees(113.3191, 23.109, this.params.height),
                    // 模型旋转情况
                    new Cesium.HeadingPitchRoll(this.params.degress, 0, 0)
                )
            }
        })
    }

}

export default LightCone
