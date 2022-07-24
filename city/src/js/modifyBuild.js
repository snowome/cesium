import * as Cesium from 'cesium'

function modifyBuild(viewer) {

    // 添加3D建筑
    const tiles3d = new Cesium.createOsmBuildings()
    viewer.scene.primitives.add(tiles3d)
    // 广州塔的瓦片石头多个模型构成，处理塔上黑块儿问题
    tiles3d.style = new Cesium.Cesium3DTileStyle({
        show: "${name} !== '广州塔'"
    })

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
                    
                    // 动态光环
                    // czm_frameNumber获取当前帧数
                    // fract(x),返回x的小数部分，60是每秒60帧，乘以10是为了慢下来            
                    float time  = fract(czm_frameNumber / (60.0 * 10.0));
                    // float time  = fract(czm_frameNumber / 60.0) * 6.28;
                    // 实现往返的操作
                    time = abs(time - 0.5) * 2.0;
                    // time = sin(time);
                    // clamp(x, min, max)，返回x在min和max之间的值，小于min则等于min，大于max则为max。500指建筑物的高度
                    float diff = abs(clamp(position.z / 500.0, 0.0, 1.0) - time);
                    // step(edge, x)，如果x大于等于edge，返回1，否则返回0
                    diff = step(0.01, diff);
                    gl_FragColor.rgb += vec3(0.5) * (1.0 - diff);
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
