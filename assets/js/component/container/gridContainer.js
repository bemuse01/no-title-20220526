import vSection from '../section/vSection.js'
import vSectionBox from '../section/vSectionBox.js'
import vSectionItem from '../section/vSectionItem.js'

const getCount = ({width, height, size, sw, sh}) => {
    if(!size) return {count: 1}

    const squareWidth = size * sw
    const squareHeight = size * sh

    const rw = Math.floor(width / squareWidth)
    const pw = rw === 0 ? 1 : rw

    const rh = Math.floor(height / squareHeight)
    const ph = rh === 0 ? 1 : rh
    const count = pw * ph

    return {count}
}
const generateItem = (key, openTime, position) => ({
    key,
    style: position === 'center' ? {} : {
        opacity: '0',
        animation: `blink2 0.06s ${openTime + Math.random()}s 2 forwards`
    }
})

export default {
    components: {
        'v-section': vSection,
        'v-section-box': vSectionBox,
        'v-section-item': vSectionItem
    },
    template: `
        <div id="grid-container">

            <v-section
                v-for="section in sections"
                :class="section.sectionClassName"
                :key="section.key"
                :sectionStyle="section.sectionStyle"
            >
                <v-section-box
                    :class="section.boxClassName" 
                    :size="size"
                    :position="section.position"
                    :ref="el => section.boxRef = el"
                >
                    <v-section-item
                        v-for="item in section.items"
                        :type="section.type"
                        :style="item.style"
                    />
                </v-section-box>
            </v-section>
            
        </div>
    `,
    setup(){
        const {ref, onMounted, computed} = Vue
        const {useStore} = Vuex

        const store = useStore()

        const openTime = computed(() => store.getters['test/getOpenTime'])

        const positions = ['center', 'top', 'right', 'bottom', 'left']
        const size = ref(SIZE)
        const sw = SW
        const sh = SH

        const sections = ref(positions.map((position, key) => ({
            key,
            sectionStyle: {gridArea: position},
            position,
            type: position === 'center' ? NO_RANDOM_APP : RANDOM_APP,
            sectionClassName: `vSection-${position}`,
            boxClassName: `vSection-box-${position}`,
            boxRef: null,
            items: []
        })))

        const resize = () => {
            sections.value.forEach(section => {
                const {boxRef, position} = section
                const box = boxRef.box
                const items = section.items
                const {width, height} = box.getBoundingClientRect()
                const s = position === 'center' ? undefined : size.value

                const {count} = getCount({width, height, size: s, sw, sh})

                updateItems(items, count, position)
            })
        }

        const updateItems = (items, count, position) => {
            const len = items.length

            if(len > count){
                for(let i = 0; i < len - count; i++) items.pop()
            }else{
                for(let i = 0; i < count - len; i++) items.push(generateItem(len + i, openTime.value, position))
            }
        }

        onMounted(() => {
            resize()
            window.addEventListener('resize', () => resize())
        })

        return{
            sections,
            size
        }
    }
}