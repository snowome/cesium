import * as Cesium from 'cesium'

function modifyMap(viewer) {

    // 获取地图影像图层
    const baseLayer = viewer.imageryLayers.get(0)

    // 设置2个变量，用来判断是否进行颜色的翻转和过滤
    baseLayer.invertColor = false
    baseLayer.filterRGB = [0, 50, 100]      // [255, 255, 255] = > [0, 50, 100]

    // 更改底图着色器的代码
    const baseFragmentShader = viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources

    for (let i = 0, iLen = baseFragmentShader.length; i < iLen; i++) {

        const strS = [
            'color = czm_saturation(color, textureSaturation);',
            '#endif',
        ]
        const strT = strS.slice(0)

        if (baseLayer.invertColor) {
            strT.push('color.r = 1.0 - color.r;')
            strT.push('color.g = 1.0 - color.g;')
            strT.push('color.b = 1.0 - color.b;')
        }

        strT.push(`color.r = color.r * ${baseLayer.filterRGB[0]}.0 / 255.0;`)
        strT.push(`color.g = color.g * ${baseLayer.filterRGB[1]}.0 / 255.0;`)
        strT.push(`color.b = color.b * ${baseLayer.filterRGB[2]}.0 / 255.0;`)

        baseFragmentShader[i] = baseFragmentShader[i].replace(
            strS.join('\n'),
            strT.join('\n')
        )
    }

}

export default modifyMap
