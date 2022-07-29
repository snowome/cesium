import * as Cesium from 'cesium'


// const kmlURL = './_assets/kml/facilities.kml'

const kmlURL = './_assets/kml/gdpPerCapita2008.kmz'

const kmlData = Cesium.KmlDataSource.load(kmlURL)
kmlData.then(d => {
    viewer.dataSources.add(d)
})
