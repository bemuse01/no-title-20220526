export default {
    vertex: `
        uniform float uPointSize;

        void main(){
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
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