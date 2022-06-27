import ShaderMethod from '../../../method/method.shader.js'

export default {
    vertex: `
        uniform float uTime;
        uniform float uRangeX;
        uniform float uStr;
        uniform float uVel;

        ${ShaderMethod.snoise3D()}

        void main(){
            vec3 nPosition = position;

            float n = snoise3D(vec3(vec2(uStr), uTime * uVel));

            nPosition.x = n * uRangeX;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(nPosition, 1.0);
        }
    `,
    fragment: `
        uniform vec3 uColor;
        uniform float uOpacity;

        void main(){
            
            gl_FragColor = vec4(uColor, uOpacity);
        }
    `
}