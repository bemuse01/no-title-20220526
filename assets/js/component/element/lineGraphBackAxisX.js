export default {
    template: `
        <div class="lineGraph-back-axisX" :style="style">

            <div
                class="axisX-point"
                v-for="item in items"
                :key="item.key"
            >
            </div>

        </div>
    `,
    props: {
        len: Number,
        gap: String
    },
    setup(props){
        const {ref} = Vue

        const len = props.len
        const gap = props.gap

        const style = ref({gap})

        const items = ref(Array.from({length: len}, (_, key) => ({key})))
        
        return{
            style,
            items
        }
    }
}