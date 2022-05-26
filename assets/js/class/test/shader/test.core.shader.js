export default {
    cylinder: {
        vertex: `
            varying vec2 vUv;
            varying vec3 vPosition;

            void main(){
                vUv = uv;
                vPosition = position;

                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragment: `
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            
            varying vec2 vUv;
            varying vec3 vPosition;

            void main(){
                float len = distance(vPosition * 0.35, vec3(0));

                vec3 color = mix(uColor2, uColor1, len);

                gl_FragColor = vec4(color, len);
            }
        `
    }
}