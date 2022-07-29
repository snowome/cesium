import * as Cesium from 'cesium'


// CZML标准 https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CZML-Guide
// 加载czml数据
const czml = [
    {
        id: "document",
        name: "CZML Point - Time Dynamic",
        version: "1.0",
    },
    {
        id: "point",
        // 物体在什么时间范围可用
        availability: "2012-08-04T16:00:00Z/2012-08-04T16:05:00Z",
        position: {
            // 设置物体的起始时间
            epoch: "2012-08-04T16:00:00Z",
            // 设置了4条数据，每条数据包含4个维度：1维是时间（秒），2维是经度，3维是纬度，4维是高度
            cartographicDegrees: [
                0, -70, 20, 150000,
                100, -80, 44, 150000,
                200, -90, 18, 150000,
                300, -98, 52, 150000,
            ],
        },
        point: {
            color: {
                rgba: [255, 255, 255, 128],
            },
            outlineColor: {
                rgba: [255, 0, 0, 128],
            },
            outlineWidth: 3,
            pixelSize: 15,
        },
    },
];
// const czml = './_assets/czml/box.czml'
const czmlData = Cesium.CzmlDataSource.load(czml)


czmlData.then(d => {
    viewer.dataSources.add(d)
})
