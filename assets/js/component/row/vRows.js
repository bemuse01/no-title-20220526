const vRows = {
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
        width: {
            default: '100%',
            type: String
        },
        height: {
            default: '100%',
            type: String
        },
        gap: String,
    },
    setup(props){
        const {toRefs, ref} = Vue

        const {width, height, gap, reverse} = toRefs(props)
        
        const style = ref({width, height, gap, flexDirection: reverse.value ? 'row-reverse' : 'row'})

        return {style}
    }
}