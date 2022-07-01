const AxisX = {
    template: `
        <div class="axisX" :style="rootStyle">

            <div class="axisX-box" :style="boxStyle">

                <div
                    class="axisX-point"
                    v-for="item in items"
                    :key="item.key"
                    :style="item.style"
                >
                </div>

            </div>

        </div>
    `,
    props: {
        height: String,
        len: Number,
        gap: String,
        justifyItems: String,
        justifyContent: String,
        alignItems: String,
        alignContent: String,
    },
    setup(props){
        const {ref, toRefs} = Vue

        const {len, gap, height, justifyContent, justifyItems, alignItems, alignContent} = toRefs(props)

        const rootStyle = ref({justifyContent, justifyItems, alignItems, alignContent})
        const boxStyle = ref({gap, height})

        const items = ref(Array.from({length: len.value}, (_, key) => ({
            key,
        })))

        return{
            rootStyle,
            boxStyle,
            items
        }
    }
}