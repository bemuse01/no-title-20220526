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
        },
        gap: String,
    },
    setup(props){
        const {ref} = Vue
        
        const reverse = props.reverse
        const gap = props.gap

        const style = ref({gap, flexDirection: reverse ? 'row-reverse' : 'row'})

        return {style}
    }
}