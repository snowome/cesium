import * as Cesium from 'cesium'
import RadarMaterialProperty from './material/RadarMaterialProperty.js'

// 雷达
class RadarLight {
    constructor(viewer) {
        this.entity = viewer.entities.add({
            rectangle: {
                coordinates: Cesium.Rectangle.fromDegrees(
                    // 西边的经度
                    113.3291,
                    // 南边维度
                    23.099,
                    // 东边经度
                    113.3391,
                    // 北边维度
                    23.109,
                ),
                material: new RadarMaterialProperty(),
            }
        })
    }

}

export default RadarLight
