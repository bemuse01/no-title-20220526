import Method from '../../method/method.js'

const genRand = (max) => {
    return ~~(Math.random() * max)
}

export default {
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
            'xxxx_xxxx_xxxx_xxxx_xxxxxxx',
            'xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx',
            'xxxxxxxx_xxxx_xxxx_xxxx_xxxx',
            'xxxx_xxxx_xxxx_xxxx',
            'xxxxxx_xxxx_xxxx_xxxxxx',
            'xxxx_xxxxxx_xxxxxxxx_xxxx_xxxxxx',
            'xxxx_xxxx_xxxxxx_xxxxxxxxxx'
        ]

        const items = ref(Array.from({length: 3}, (_, key) => ({
            key,
            style: {
                animation: `moveBottomToTop 3s ${1 * key}s infinite linear`
            },
            text: Method.uuidv4(uuid[genRand(uuid.length)]).toUpperCase()
        })))

        return{
            items
        }
    }
}