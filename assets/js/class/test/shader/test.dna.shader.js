// import ShaderMethod from '../../../method/method.shader.js'

const TestDnaShader = {
    bone: {
        vertex: `
            attribute float aPointSize;
            attribute float delay;

            uniform float uTime;
            uniform float uDuration;
            uniform float elapsedTime;

            varying vec3 vPosition;
            varying float vOpacity;

            ${ShaderMethod.snoise3D()}
            ${ShaderMethod.executeNormalizing()}

            void main(){
                // position
                vec3 nPosition = position;

                float rx = snoise3D(vec3(position.xz * 8.0, uTime * 0.0015));
                float ry = snoise3D(vec3(position.xz * 9.0, uTime * 0.00125));
                float rz = snoise3D(vec3(position.xz * 10.0, uTime * 0.001));

                nPosition.xyz += vec3(rx, ry, rz) * 0.5;
                
                
                // opacity
                float p = clamp(elapsedTime - delay, 0.0, uDuration) / uDuration;
                float o = mix(0.0, 1.0, p);


                gl_Position = projectionMatrix * modelViewMatrix * vec4(nPosition, 1.0);
                gl_PointSize = aPointSize;

                vPosition = position;
                vOpacity = o;
            }
        `,
        fragment: `
            uniform vec3 uColor;
            uniform float uTime;

            varying vec3 vPosition;
            varying float vOpacity;

            ${ShaderMethod.snoise3D()}
            ${ShaderMethod.executeNormalizing()}

            void main(){
                float f = length(gl_PointCoord - vec2(0.5));
                
                float r = snoise3D(vec3(vPosition.xz * 10.0, uTime * 0.001));
                float n = executeNormalizing(r, 0.35, 0.5, -1.0, 1.0);
                float n2 = executeNormalizing(r, 0.1, 0.35, -1.0, 1.0);

                if(f > n){
                    discard;
                }

                if(f < n2){
                    discard;
                }

                gl_FragColor = vec4(uColor, vOpacity);
            }
        `
    },
    nucleo: {
        vertex: `
            attribute vec3 sPoints;
            attribute vec3 ePoints;
            attribute float delay;

            uniform float uPointSize;
            uniform float uTime;
            uniform float uDuration;
            uniform float elapsedTime;

            varying float vOpacity;

            ${ShaderMethod.snoise3D()}
            ${ShaderMethod.executeNormalizing()}

            void main(){
                // position
                vec3 nPosition = position;

                float rx = snoise3D(vec3(position.xz * 8.0, uTime * 0.002));
                float ry = snoise3D(vec3(position.xz * 9.0, uTime * 0.00175));
                float rz = snoise3D(vec3(position.xz * 10.0, uTime * 0.0015));
                
                float rp = snoise3D(vec3(position.xz * 20.0, uTime * 0.0005));
                float rpn = executeNormalizing(rp, 0.0, 1.0, -1.0, 1.0);

                vec3 pos = mix(sPoints, ePoints, rpn);

                nPosition = pos;
                nPosition.xyz += vec3(rx, ry, rz) * 0.5;


                // opacity
                float p = clamp(elapsedTime - delay, 0.0, uDuration) / uDuration;
                float o = mix(0.0, 1.0, p);


                gl_Position = projectionMatrix * modelViewMatrix * vec4(nPosition, 1.0);
                gl_PointSize = uPointSize;

                vOpacity = o;
            }
        `,
        fragment: `
            uniform vec3 uColor;

            varying float vOpacity;

            void main(){
                float f = length(gl_PointCoord - vec2(0.5));
                
                if(f > 0.5){
                    discard;
                }

                gl_FragColor = vec4(uColor, vOpacity);
            }       
        `
    }
}