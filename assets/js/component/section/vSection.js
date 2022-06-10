export default {
    template: `
        <div class="vSection" :style="rootStyle">
            
        </div>
    `,
    setup(props){
        const {ref} = Vue

        const rootStyle = props.style

        return{
            rootStyle
        }
    }
}