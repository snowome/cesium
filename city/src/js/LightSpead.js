import * as Cesium from 'cesium'
import Gsap from 'gsap'

import LightSpreadMaterialProperty from './material/LightSpreadMaterialProperty.js'

class LightSpead {
    constructor(viewer) {
        this.params = {
            // 西边的经度
            west: 113.3091,
            // 南边维度
            south: 23.119,
            // 东边经度
            east: 113.3141,
            // 北边维度
            north: 23.124,
        }
        this.entity = viewer.entities.add({
            rectangle: {
                coordinates: Cesium.Rectangle.fromDegrees(
                    // 西边的经度
                    113.3091,
                    // 南边维度
                    23.119,
                    // 东边经度
                    113.3141,
                    // 北边维度
                    23.124,
                ),
                material: new LightSpreadMaterialProperty(),
            }
        })
        Gsap.to(this.params, {
            // 西边的经度
            west: 113.1991,
            // 南边维度
            south: 23.009,
            // 东边经度
            east: 113.4241,
            // 北边维度
            north: 23.234,

            duration: 5,
            repeat: -1,
            // yoyo: true,
            ease: 'linear',
            onUpdate: () => {
                this.entity.rectangle.coordinates = Cesium.Rectangle.fromDegrees(
                    // 西边的经度
                    this.params.west,
                    // 南边维度
                    this.params.south,
                    // 东边经度
                    this.params.east,
                    // 北边维度
                    this.params.north,
                )
            }
        })
    }
}

export default LightSpead
