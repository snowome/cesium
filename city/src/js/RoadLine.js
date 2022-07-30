import * as Cesium from 'cesium'
import RoadLineMaterialProperty from './material/RoadLineMaterialProperty.js'

class RoadLine {
    constructor(viewer) {
        const geoData = Cesium.GeoJsonDataSource.load('../_assets/geojson/roadline.geojson')
        geoData.then(d => {
            viewer.dataSources.add(d)
            const entities = d.entities.values
            const flyLightMaterial = new RoadLineMaterialProperty()
            entities.forEach(d => {
                const polyline = d.polyline
                polyline.material = flyLightMaterial
            })
        })
    }

}

export default RoadLine
