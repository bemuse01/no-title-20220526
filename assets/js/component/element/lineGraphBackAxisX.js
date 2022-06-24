export default {
    template: `
        <div class="lineGraph-back-axisX" :style="rootStyle">

            <div class="lineGraph-back-axisX-box" :style="boxStyle">

                <div
                    class="axisX-point"
                    v-for="item in items"
                    :key="item.key"
                >
                </div>

            </div>

        </div>
    `,
    props: {
        len: Number,
        gap: String,
        justifyItems: String,
        justifyContent: String,
        alignItems: String,
        alignContent: String,
    },
    setup(props){
        const {ref, toRefs} = Vue

        const {len, gap, justifyContent, justifyItems, alignItems, alignContent} = toRefs(props)

        const rootStyle = ref({justifyContent, justifyItems, alignItems, alignContent})
        const boxStyle = ref({gap})

        const items = ref(Array.from({length: len.value}, (_, key) => ({key})))

        return{
            rootStyle,
            boxStyle,
            items
        }
    }
}