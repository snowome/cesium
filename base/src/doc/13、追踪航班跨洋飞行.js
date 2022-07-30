import * as Cesium from 'cesium'

const planeData = require('./_assets/json/plane.json')

// 位置采样
const positionProperty = new Cesium.SampledPositionProperty()

// 时间间隔
const timeStepInSeconds = 30

// 整个飞行花费的时间
const totalSeconds = (planeData.length - 1) * timeStepInSeconds

// 设置起点时间
const time = new Date('2022-03-09T23:10:00Z')

// cesium，默认使用的是儒略日的时间
// 所以需要起点时间转换成儒略日的时间
const startJulianData = Cesium.JulianDate.fromDate(time)
const endJulianData = Cesium.JulianDate.addSeconds(
    startJulianData,
    totalSeconds,
    new Cesium.JulianDate(),
)

// 将查看器的时间调整到起点和结束点的范围
viewer.clock.startTime = startJulianData.clone()
viewer.clock.stopTime = endJulianData.clone()
viewer.clock.currentTime = startJulianData.clone()
viewer.timeline.zoomTo(startJulianData, endJulianData)

planeData.forEach((item, index) => {
    // 当前点的时间
    const time = Cesium.JulianDate.addSeconds(
        startJulianData,
        index * timeStepInSeconds,
        new Cesium.JulianDate(),
    )
    // 设置当前点的位置
    const position = Cesium.Cartesian3.fromDegrees(
        item.longitude,
        item.latitude,
        item.height
    )
    // 添加轨迹采样点
    positionProperty.addSample(time, position)

    // 添加点
    viewer.entities.add({
        position: position,
        point: {
            pixelSize: 10,
            color: Cesium.Color.RED,
            outlineWidth: 0.2,
            outlineColor: Cesium.Color.WHITE,
        }
    })
})

// 创建飞机
const planeEntity = viewer.entities.add({
    name: '飞机',
    // 什么时候可见
    availability: new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({
            start: startJulianData,
            stop: endJulianData,
        })
    ]),
    position: positionProperty,
    // VelocityOrientationProperty会自动根据采样点，计算出飞机的速度和方向
    orientation: new Cesium.VelocityOrientationProperty(positionProperty),
    model: {
        uri: './_assets/model/Air.glb',
        // minimumPixelSize: 128,
        // maximumScale: 20000,
    },
    // 绘制轨迹线
    path: new Cesium.PathGraphics(5),
})

// 相机追踪运动的问题
viewer.trackedEntity = planeEntity

// 设置时间速率
viewer.clock.multiplier = 60
