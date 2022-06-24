import ShaderMethod from '../../../method/method.shader.js'

export default {
    vertex: `
        uniform float uTime;
        uniform float uRangeY;
        uniform float uStr;

        attribute vec2 seed;

        ${ShaderMethod.snoise3D()}

        void main(){
            vec3 nPosition = position;

            float n = snoise3D(vec3(seed * uStr, uTime * 0.00075));

            nPosition.y = n * uRangeY;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(nPosition, 1.0);
        }
    `,
    fragment: `
        uniform vec3 uColor;

        void main(){
            
            gl_FragColor = vec4(uColor, 1.0);
        }
    `
}