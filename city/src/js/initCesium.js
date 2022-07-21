import * as Cesium from 'cesium'
import {CESIUM_TOKEN} from '@/config.js'

Cesium.Ion.defaultAccessToken = CESIUM_TOKEN

window.CESIUM_BASE_URL = '../_assets/cesium/'

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
