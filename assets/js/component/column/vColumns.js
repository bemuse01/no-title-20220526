export default {
    template: `
        <div class="vColumns" :style="style">
            <slot></slot>
        </div>
    `,
    props: {
        reverse: {
            default: false,
            type: Boolean
        },
        gap: String
    },
    setup(props){
        const {ref} = Vue
        
        const reverse = props.reverse
        const gap = props.gap

        const style = ref({gap, flexDirection: reverse ? 'column-reverse' : 'column'})

        return {style}
    }
}