import * as Cesium from 'cesium'


const viewer = new Cesium.Viewer(document.body, {
    // 设置地形
    // terrainProvider: Cesium.createWorldTerrain({
    //     requestVertexNormals: true,
    //     requestWaterMask: true,
    // }),
    /** 自定义地形数据
     * http://www.gscloud.cn/
     * 数据资源->公开数据->DEM 数字高程数据->GDEMV3 30M 分辨率数字高程数据->下载后，得到tif后缀的数据
     * 然后到 http://www.cesiumlab.com/ 下载软件
     * 打开软件：地形切片->选择输入文件->处理参数选择：三角算法vcg->存储类型：散列->
     * **/
    terrainProvider: new Cesium.CesiumTerrainProvider({
        url: './_assets/terrains/gz'
    }),
    // 天地图 https://www.tianditu.gov.cn/
    imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        //     // 矢量地图
        //     // url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=30d07720fa76f07732d83c748bb84211",
        //     // 影像地图
        url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=30d07720fa76f07732d83c748bb84211",
        layer: "tdtBasicLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
    }),
    // OSM地图
    // imageryProvider: new Cesium.OpenStreetMapImageryProvider({
    //     url: "https://a.tile.openstreetmap.org/",
    // }),
    // 高德矢量地图
    // imageryProvider: new Cesium.UrlTemplateImageryProvider({
    //     url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    //     layer: "tdtVecBasicLayer",
    //     style: "default",
    //     format: "image/png",
    //     tileMatrixSetID: "GoogleMapsCompatible",
    // }),
})


// 地图叠加
// const imageLayers = viewer.imageryLayers
// const layers = imageLayers.addImageryProvider(
//     new Cesium.UrlTemplateImageryProvider({
//         url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
//         layer: "tdtVecBasicLayer",
//         style: "default",
//         format: "image/png",
//         tileMatrixSetID: "GoogleMapsCompatible",
//     })
// )
// layers.alpha = 0.5
