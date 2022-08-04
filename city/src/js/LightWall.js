import * as Cesium from 'cesium'
import Gsap from 'gsap'

import LightWallMaterialProperty from './material/LightWallMaterialProperty.js'

class LightWall {
    constructor(viewer) {
        // 设置雷达材质
        this.LightWallMaterial = new LightWallMaterialProperty("lightWallMaterial");
        this.entity = viewer.entities.add({
            name: 'lightWall',
            position: Cesium.Cartesian3.fromDegrees(113.3081, 23.101, 200),
            wall: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                    113.3051, 23.099, 200.0,
                    113.3101, 23.099, 200.0,
                    113.3101, 23.104, 200.0,
                    113.3051, 23.104, 200.0,
                    113.3051, 23.099, 200.0,
                ]),
                material: this.LightWallMaterial,
                // outline: true,
            }
        })
    }
}

export default LightWall
