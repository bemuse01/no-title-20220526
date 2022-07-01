const genRand = (max) => {
    return ~~(Math.random() * max)
}

const TestTopCodeNumbers = {
    template: `
        <div class="code-numbers" :style="rootStyle">

            <div
                class="code-number"
                v-for="num in nums"
                :key="num.key"
            ><p>{{num.text}}</p>
            </div>

        </div>
    `,
    props: {
        len: Number,
        gap: String,
    },
    setup(props){
        const {ref} = Vue

        const gap = props.gap
        const len = props.len

        const rootStyle = ref({gap})

        const nums = ref(Array.from({length: len}, (_, key) => ({
            key,
            text: genRand(1000)
        })))

        return{
            nums,
            rootStyle
        }
    }
}