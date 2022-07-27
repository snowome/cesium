import * as Cesium from 'cesium'
import Gsap from 'gsap'
import '@/_assets/cesium/Widgets/widgets.css'

import '@/css/common.scss'

import {CESIUM_TOKEN} from '@/config.js'

Cesium.Ion.defaultAccessToken = CESIUM_TOKEN

window.CESIUM_BASE_URL = './_assets/cesium/'

// 设置相机默认视角
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
    // 西经
    73.33,
    // 南纬
    3.51,
    // 东经
    135.05,
    // 北纬
    53.33,
)

const viewer = new Cesium.Viewer(document.body, {
    // 信息框 是否显示
    infoBox: false,
    // 搜索框 是否显示
    geocoder: false,
    // Home 是否显示
    homeButton: false,
    // 2d、3d、2.5d 显示模式 是否显示
    sceneModePicker: false,
    // 地图影像 切换 是否显示
    baseLayerPicker: false,
    // 帮助按钮 是否显示
    navigationHelpButton: false,
    // 左下角 动画控制 是否显示
    animation: false,
    // 底部 时间轴 是否显示
    timeline: false,
    // 全屏按钮 是否显示
    fullscreenButton: false,
    // 天地图 https://www.tianditu.gov.cn/
    // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
    // 矢量地图
    // url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=30d07720fa76f07732d83c748bb84211",
    // 影像地图
    // url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=30d07720fa76f07732d83c748bb84211",
    // layer: "tdtBasicLayer",
    // style: "default",
    // format: "image/jpeg",
    // tileMatrixSetID: "GoogleMapsCompatible",
    // }),
})

// 去掉左下角的logo
viewer.cesiumWidget.creditContainer.style.display = 'none'


// 第一步：创建几何体
const rectGeometry = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(
        // 西边的经度
        115,
        // 南边维度
        20,
        // 东边经度
        135,
        // 北边维度
        30
    ),
    // 距离表面距离
    height: 0,
    // vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
})

// 第二步：创建几何体实例
const instance = new Cesium.GeometryInstance({
    id: 'redRect',
    geometry: rectGeometry,
    attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.RED.withAlpha(0.5)
        )
    }
})

// 第三步：设置外观
// const material = new Cesium.Material({
//     fabric: {
//         type: 'Color',
//         uniforms: {
//             color: new Cesium.Color(1.0, 0.0, 0.0, 0.5)
//         }
//     }
// })
// const material = new Cesium.Material({
//     fabric: {
//         type: 'Image',
//         uniforms: {
//             image: require('@/texture/logo.png'),
//             repeat: new Cesium.Cartesian2(2, 2),
//         }
//     }
// })
const defaultMaterial = `默认
czm_material czm_getMaterial(czm_materialInput materialInput) {
    czm_material material = czm_getDefaultMaterial(materialInput);
    return material;
}
`
const material = new Cesium.Material({
    fabric: {
        uniforms: {
            uTime: 0.0,
        },
        source: `
            czm_material czm_getMaterial(czm_materialInput materialInput) {
                czm_material material = czm_getDefaultMaterial(materialInput);
                float strength = mod((materialInput.s + uTime) * 10.0, 1.0);
                material.diffuse = vec3(strength, 0.0, 0.0);
                return material;
            }
        `
    }
})
Gsap.to(material.uniforms, {
    uTime: 1.0,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'linear',
})
// console.log(material)
// console.log(material.shaderSource)
// EllipsoidSurfaceAppearance 确定几何体都是与地球的椭球体平行，平行可以在计算大量顶点属性的时候节省内存。
const appearance = new Cesium.EllipsoidSurfaceAppearance({
    material: material
})
// console.log(appearance)
// console.log(appearance.vertexShaderSource)
// console.log(appearance.fragmentShaderSource)


// 第四步：创建图元
const primitive = new Cesium.Primitive({
    geometryInstances: instance,  // 可以是多个，用数组[instance1、instance2]
    appearance: appearance,
})

// 第五步：添加到viewer
viewer.scene.primitives.add(primitive)
