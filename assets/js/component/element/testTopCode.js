export default {
    template: `
        <div class="top-code">

            <div class="top-code-box" :style="boxStyle">

                <div class="code-bg code-head"></div>
                
                <div class="code-bg code-body">
                </div>

            </div>

        </div>
    `,
    props: {
        width: String
    },
    setup(props){
        const {ref} = Vue

        const width = props.width
        
        const boxStyle = ref({width})

        return{
            boxStyle
        }
    }
}