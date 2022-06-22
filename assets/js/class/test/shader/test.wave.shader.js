import ShaderMethod from '../../../method/method.shader.js'

export default {
    vertex: `
        uniform float uPointSize;
        uniform float uTime;

        ${ShaderMethod.snoise3D()}

        void main(){
            vec3 nPosition = position;

            float n = snoise3D(vec3(nPosition.xy, uTime * 0.001));

            nPosition.y += n * 0.5;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(nPosition, 1.0);
            gl_PointSize = uPointSize;
        }
    `,
    fragment: `
        uniform vec3 uColor;
        uniform float uOpacity;

        void main(){
            float f = length(gl_PointCoord - vec2(0.5));
            
            if(f > 0.5){
                discard;
            }

            gl_FragColor = vec4(uColor, uOpacity);
        }       
    `
}