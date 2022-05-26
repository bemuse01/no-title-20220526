export default {
    vertex: `
        varying vec2 vUv;

        void main(){
            vUv = uv;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragment: `
        varying vec2 vUv;
        
        void main(){
            float len = 0.5 - distance(vUv, vec2(0.5));

            gl_FragColor = vec4(vec3(1), 1.);
        }
    `
}