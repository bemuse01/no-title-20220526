export default {
    vertex: `
        varying vec2 vUv;

        void main(){
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            
            vUv = uv;
        }
    `,
    fragment: `
        uniform float uBound;
        uniform vec3 uColor;
        uniform float uLightOpacity;
        uniform float uDefaultOpacity;
        uniform float uOpacity;

        varying vec2 vUv;

        void main(){
            float opacity = uDefaultOpacity;
            
            if(vUv.y < uBound){
                opacity = uLightOpacity;
            }

            gl_FragColor = vec4(uColor, opacity * uOpacity);
        }
    `
}