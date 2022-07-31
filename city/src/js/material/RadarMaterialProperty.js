import * as Cesium from 'cesium'
import Gsap from 'gsap'

// 雷达
class RadarMaterialProperty {
    constructor(name = 'radar') {
        this.name = name
        this.definitionChanged = new Cesium.Event()
        this.typeName = 'radarMaterial'
        Cesium.Material._materialCache.addMaterial(this.typeName, {
            fabric: {
                type: this.typeName,
                uniforms: {
                    uTime: 0,
                },
                source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                        // 生成默认的基础材质
                        czm_material material = czm_getDefaultMaterial(materialInput);
                        
                        // 旋转st（UV），materialInput.st - 0.5 是为了沿着比如左下角旋转，而不是圆心
                        vec2 newST = mat2(
                                        cos(uTime), -sin(uTime),
                                        sin(uTime), cos(uTime)
                                    ) * (materialInput.st - 0.5);
                        
                        // 因为materialInput.st - 0.5，所以需要再恢复回去
                        newST = newST + 0.5;
                        
                        vec2 st = newST;
                        
                        // 平滑过渡函数 smoothstep(edge0, edge1, value);
                        // edge0 = 8; edge1 = 10;
                        // 参数3：当前值,==7 , result = 0
                        // 参数3：当前值,==9 , result = 0.5
                        // 参数3：当前值,==10 , result = 1
                        
                        // 设置圆，外部透明，内部不透明
                        float alpha = distance(st, vec2(0.5, 0.5));
                        alpha = 1.0 - step(0.5, alpha);

                        // 按照角度来设置强弱
                        float angle = atan(st.x - 0.5, st.y - 0.5);
                        // angle 是-PI 到 PI，想要得到0-1的值
                        float strength = (angle + 3.1416) / 6.2832; 
                        
                        // 将强弱与透明度结合
                        alpha = alpha * strength;
                        
                        material.alpha = alpha;
                        material.diffuse = vec3(st.s, st.t, 1.0);
                        
                        // 根据UV采样颜色
                        // vec4 color = texture2D( image, vec2( fract(st.s - uTime), st.t ) );
                        
                        return material;
                    }
                `
            }
        })
        this.params = {
            uTime: 0,
        }
        Gsap.to(this.params, {
            uTime: 6.28,
            duration: 1,
            repeat: -1,
            // yoyo: true,
            ease: 'linear'
        })
    }

    equals(other) {
        // 判断两个材质是否相等
        return other instanceof RadarMaterialProperty && this.name === other.name
    }

    getType() {
        return this.typeName
    }

    getValue(time, result) {
        result.uTime = this.params.uTime
        return result
    }

}


export default RadarMaterialProperty
