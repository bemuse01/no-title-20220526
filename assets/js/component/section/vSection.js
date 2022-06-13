export default {
    template: `
        <div class="vSection" :style="sectionStyle" :ref="el => box = el">
            
            <!--<div :class="boxClassName" :style="boxStyle">

                <div
                    class="vSection-item"
                    v-for="i in items"
                    :key="i.key"
                >
                </div>

            </div>-->
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