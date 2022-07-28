import * as Cesium from 'cesium'
// 地理空间分析库 https://turfjs.fenxianglu.cn/
import * as Turf from '@turf/turf'
import FlyLightMaterialProperty from '@/js/material/FlyLightMaterialProperty.js'

class FlyLight {
    constructor(viewer) {
        // 设置巨型区域，2个点生成一个矩形
        this.bbox = [
            113.2791, 23.144,
            113.3591, 23.073,
        ]
        // 在bbox矩形范围内，随机生成300个点
        const points = Turf.randomPoint(300, {bbox: this.bbox})
        // 通过生成的随机点生成线
        const features = points.features
        features.forEach(item => {
            // 获取点的经纬度
            const point = item.geometry.coordinates
            // console.log(point)
            // 根据点设置起始位置
            const start = Cesium.Cartesian3.fromDegrees(point[0], point[1], 0)
            // 根据点设置结束位置
            const end = Cesium.Cartesian3.fromDegrees(point[0], point[1], 200 + Math.random() * 3000)
            // 创建飞线材质
            const flyLightMaterial = new FlyLightMaterialProperty()
            // 创建线
            viewer.entities.add({
                polyline: {
                    positions: [start, end],
                    width: 2,
                    material: flyLightMaterial
                }
            })

        })

    }
}

export default FlyLight
