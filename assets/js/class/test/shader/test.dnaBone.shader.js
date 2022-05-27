import ShaderMethod from '../../../method/method.shader.js'

export default {
    vertex: `
        attribute float aPointSize;

        varying vec3 vPosition;

        void main(){
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aPointSize;

            vPosition = position;
        }
    `,
    fragment: `
        uniform vec3 uColor;
        uniform float uTime;

        varying vec3 vPosition;

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

            gl_FragColor = vec4(uColor, 1.0);
        }
    `
}