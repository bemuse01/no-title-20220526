export default {
    template: `
        <div class="vRows" :style="style">
            <slot></slot>
        </div>
    `,
    props: {
        reverse: {
            default: false,
            type: Boolean
        }  
    },
    setup(props){
        const {ref} = Vue
        
        const reverse = props.reverse

        const style = ref({flexDirection: reverse ? 'row-reverse' : 'row'})

        return {style}
    }
}