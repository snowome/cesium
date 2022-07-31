import * as Cesium from 'cesium'


// 3D tiles 格式规范： https://github.com/CesiumGS/3d-tiles/tree/main/specification

// viewer.scene.primitives.add(
//     new Cesium.createOsmBuildings()
// )


const tilesset = new Cesium.Cesium3DTileset({
    url: './_assets/tiles/tileset.json'
})
viewer.scene.primitives.add(tilesset)

tilesset.readyPromise.then(tiles => {
    tiles.style = new Cesium.Cesium3DTileStyle({
        // color: "color('yellow')",
        // 定义了distance变量，以经纬度：-1.31968, 0.698874 为中心的距离
        defines: {
            distance: "distance(vec2(${Longitude}, ${Latitude}), vec2(-1.31968, 0.698874))"
        },
        color: {
            conditions: [
                ["${distance} < 0.00001", "color('red')"],
                ["${distance} < 0.00002", "color('green')"],
                ["${distance} < 0.00003", "color('blue')"],
                ["${distance} < 0.00004", "color('orange')"],
                // ["${Longitude} === -1.3196656317210846 && ${Latitude} === 0.6988863062831799", "rgba(110, 200, 230, 0.5)"],
                // ["${Height} >= 80", "color('red')"],
                // ["${Height} >= 70", "rgba(255, 255, 0, 0.5)"],
                ["${Height} >= 10", "color('#cf2828')"],
            ]
        },
        show: "${distance} > 0.00001 && ${distance} < 1",       // true
    })
    viewer.zoomTo(tiles)
})


// 3dtiles调试面板
// viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin)
