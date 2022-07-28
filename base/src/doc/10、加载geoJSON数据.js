import * as Cesium from 'cesium'

/** 加载 geojson 数据
 *  阿里云datav网址 https://datav.aliyun.com/portal/school/atlas/area_selector
 * **/
const geoURL = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
const geoData = Cesium.GeoJsonDataSource.load(geoURL, {
    stroke: Cesium.Color.RED,
    fill: Cesium.Color.SKYBLUE.withAlpha(0.5),
    strokeWidth: 4,
})
// viewer.dataSources.add(geoData)
geoData.then(d => {
    viewer.dataSources.add(d)
    const entities = d.entities.values
    entities.forEach(entity => {
        entity.polygon.material = new Cesium.ColorMaterialProperty(
            Cesium.Color.fromRandom({
                alpha: 1.0
            })
        )
        entity.polygon.outline = false
        const randomHeight = parseInt( Math.random() * 5 )
        entity.polygon.extrudedHeight = 100000 * randomHeight
    })

})
