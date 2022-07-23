import * as Cesium from 'cesium'

function modifyBuild(viewer) {

    // 添加3D建筑
    const tiles3d = new Cesium.createOsmBuildings()
    viewer.scene.primitives.add(tiles3d)

    // 监听当瓦片加载时候执行事件
    tiles3d.tileVisible.addEventListener(function (tile) {
        const cesium3DTileContent = tile.content
        // 循环一个个的模型
        const featuresLength = cesium3DTileContent.featuresLength
        for (let i = 0; i < featuresLength; i++) {
            const model = cesium3DTileContent.getFeature(i).content._model
            // 复制了一份基础代码改的
            const fragmentShaderSource = `
                varying vec3 v_positionMC;
                varying vec3 v_positionEC;
                varying vec2 v_st;
            
                void main()
                {
                    czm_materialInput materialInput;
                    
                    // 获取模型position信息
                    vec4 position = czm_inverseModelView * vec4(v_positionEC, 1.0);
                    // 根据高度来设置渐变颜色
                    float  strength = position.z / 200.0;
                    gl_FragColor = vec4(strength, 0.3 * strength, strength, 1.0);
                }
            `
            if (model._rendererResources.sourceShaders[1] != null) {
                model._rendererResources.sourceShaders[1] = fragmentShaderSource
            }

            // 片元着色器已经修改，需要更新
            model._shouldRegenerateShaders = true
        }
    })
}

export default modifyBuild
