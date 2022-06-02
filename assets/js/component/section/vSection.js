export default {
    template: `
        <div class="section" :style="rootStyle">
            
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