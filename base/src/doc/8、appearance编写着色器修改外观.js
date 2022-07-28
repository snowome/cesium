import * as Cesium from 'cesium'
import Gsap from 'gsap'

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
const fragmentShaderDefault = `
varying vec3 v_positionMC;
varying vec3 v_positionEC;
varying vec2 v_st;

void main() {
    czm_materialInput materialInput;

    vec3 normalEC = normalize(czm_normal3D * czm_geodeticSurfaceNormal(v_positionMC, vec3(0.0), vec3(1.0)));
    #ifdef FACE_FORWARD
        normalEC = faceforward(normalEC, vec3(0.0, 0.0, 1.0), -normalEC);
    #endif

    materialInput.s = v_st.s;
    materialInput.st = v_st;
    materialInput.str = vec3(v_st, 0.0);

    // Convert tangent space material normal to eye space
    materialInput.normalEC = normalEC;
    materialInput.tangentToEyeMatrix = czm_eastNorthUpToEyeCoordinates(v_positionMC, materialInput.normalEC);

    // Convert view vector to world space
    vec3 positionToEyeEC = -v_positionEC;
    materialInput.positionToEyeEC = positionToEyeEC;

    czm_material material = czm_getMaterial(materialInput);

    #ifdef FLAT
        gl_FragColor = vec4(material.diffuse + material.emission, material.alpha);
    #else
        gl_FragColor = czm_phong(normalize(positionToEyeEC), material, czm_lightDirectionEC);
    #endif
}
`
// EllipsoidSurfaceAppearance 确定几何体都是与地球的椭球体平行，平行可以在计算大量顶点属性的时候节省内存。
const appearance = new Cesium.EllipsoidSurfaceAppearance({
    // uniforms 不在这里定义
    // uniforms: {
    //     uTime: 1.0,
    // },
    fragmentShaderSource: `
        varying vec3 v_positionMC;
        varying vec3 v_positionEC;
        varying vec2 v_st;
        uniform float uTime;
        
        void main() {
            czm_materialInput materialInput;
            
            gl_FragColor = vec4(v_st, uTime, 1.0);
        }
    `
})
appearance.uniforms = {
    uTime: 0.0,
}
// console.log(appearance)
// console.log(appearance.vertexShaderSource)
// console.log(appearance.fragmentShaderSource)
Gsap.to(appearance.uniforms, {
    uTime: 1.0,
    duration: 2,
    yoyo: true,
    repeat: -1,
})

// 第四步：创建图元
const primitive = new Cesium.Primitive({
    geometryInstances: instance,  // 可以是多个，用数组[instance1、instance2]
    appearance: appearance,
})

// 第五步：添加到viewer
viewer.scene.primitives.add(primitive)
