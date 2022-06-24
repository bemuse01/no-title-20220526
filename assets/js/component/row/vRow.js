export default {
    template: `
        <div class="vRow" :style="style">
            <slot></slot>
        </div>
    `,
    props: {
        flex: String,
        width: String,
        height: String,
    },
    setup(props){
        const {ref} = Vue

        const flex = props.flex
        const width = props.width
        const height = props.height

        const style = ref({flex, width, height})

        return {style}
    }
}