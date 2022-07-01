const vSection = {
    template: `
        <div class="vSection" :style="sectionStyle" :ref="el => box = el">
            <slot></slot>
        </div>
    `,
    props: {
        sectionStyle: Object,
    },
    setup(props){
        const {toRefs} = Vue

        const {sectionStyle} = toRefs(props)

        return{
            sectionStyle
        }
    }
}