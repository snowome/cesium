var doc = `
一、着色器定义文档
https://cesium.com/downloads/cesiumjs/releases/b28/Documentation/
1、czm_materialInput
s                   float   一维UV
st                  vec2    二维UV
str                 vec3    三维UV
normalEC            vec3    法线
tangentToEyeMatrix  mat3    视图矩阵
positionToEyeEC     vec3     fragment 到视图（相机）的距离

2、获取模型position信息
varying vec3 v_positionEC;
vec4 position = czm_inverseModelView * vec4(v_positionEC, 1.0);

3、czm_frameNumber获取当前帧数
float time = czm_frameNumber / 60.0;
10秒一次
float time = fract(czm_frameNumber / (60.0 * 10.0));










`
