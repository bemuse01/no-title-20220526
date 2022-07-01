// import Method from '../../../method/method.js'

const genRand = (max) => {
    return ~~(Math.random() * max)
}

const TestTopCodeFlow = {
    template: `
        <div class="top-code-flow">

            <div class="code-flow-box">

                <div
                    class="code-flow-text"
                    v-for="item in items"
                    :key="item.key"
                    :style="item.style"
                ><p>{{item.text}}</p>
                </div>

            </div>
        
        </div>
    `,
    setup(){
        const {ref} = Vue

        const uuid = [
            'xxxx_xxxx_xxxx_xxxx_xxxxxx',
            'xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxx',
            'xxxxxxxx_xxxx_xxxx_xxxx',
            'xxxx_xxxx_xxxx',
            'xxxxxx_xxxx_xxxx_xxxxxx',
            'xxxx_xxxxxx_xxxxxxx_xxxx',
            'xxxx_xxxx_xxxxxx_xxxxxxxx'
        ]

        const texts = [
            'ACCESS DENIED',
            'COMPLETE',
            'NOW LOADING',
            'DONE'
        ]

        const len = 4
        const animSpeed = 2
        const delay = animSpeed / len

        const items = ref(Array.from({length: len}, (_, key) => ({
            key,
            style: {
                animation: `moveBottomToTop ${animSpeed}s ${delay * key}s infinite linear`
            },
            text: `${Method.uuidv4(uuid[genRand(uuid.length)]).toUpperCase()} // ${texts[genRand(texts.length)]}`
        })))

        return{
            items
        }
    }
}