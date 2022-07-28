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


class CustomMaterialPropery {
    constructor() {
        this.definitionChanged = new Cesium.Event()
        Cesium.Material._materialCache.addMaterial("CustomMaterial", {
            fabric: {
                type: "CustomMaterial",
                uniforms: {
                    uTime: 0,
                },
                source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        // 生成默认的基础材质
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        material.diffuse = vec3(materialInput.st, uTime);
                        return material;
                    }
                `,
            },
        })

        this.params = {
            uTime: 0,
        }
        Gsap.to(this.params, {
            uTime: 1,
            duration: 2,
            repeat: -1,
            yoyo: true,
        })
    }

    getType() {
        // 返回材质类型
        return "CustomMaterial";
    }

    getValue(time, result) {
        // // console.log(result, time);
        // let t = performance.now() / 1000;
        // t = t % 1;
        // console.log(t);
        // result.uTime = t;
        result.uTime = this.params.uTime;
        // 返回材质值
        return result;
    }
}

const material = new CustomMaterialPropery()

const rectangle = viewer.entities.add({
    id: "entityRect",
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(
            // 西边的经度
            90,
            // 南边维度
            20,
            // 东边经度
            110,
            // 北边维度
            30
        ),
        // material: Cesium.Color.RED.withAlpha(0.5),
        material: material,
    },
})
