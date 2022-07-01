const AxisY = {
    template: `
        <div class="axisY" :style="rootStyle">

            <div class="axisY-box" :style="boxStyle">

                <div
                    class="axisY-point"
                    v-for="item in items"
                    :key="item.key"
                    :style="item.style"
                >
                </div>

            </div>

        </div>
    `,
    props: {
        width: String,
        len: Number,
        gap: String,
        pointHeight: String,
        justifyItems: String,
        justifyContent: String,
        alignItems: String,
        alignContent: String,
    },
    setup(props){
        const {ref, toRefs} = Vue

        const {len, width, gap, justifyContent, justifyItems, alignItems, alignContent, pointHeight} = toRefs(props)

        const rootStyle = ref({justifyContent, justifyItems, alignItems, alignContent})
        const boxStyle = ref({width, gap})

        const items = ref(Array.from({length: len.value}, (_, key) => ({
            key,
            style: {height: pointHeight}
        })))

        return{
            rootStyle,
            boxStyle,
            items
        }
    }
}