export default {
    template: `
        <div class="lineGraph-back-axisY" :style="rootStyle">

            <div class="lineGraph-back-axisY-box" :style="boxStyle">

                <div
                    class="axisY-point"
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