import vColumns from '../../column/vColumns.js'
import vColumn from '../../column/vColumn.js'
import BarRangeBackBar from './barRangeBackBar.js'

export default {
    components: {
        'v-column': vColumn,
        'v-columns': vColumns,
        'barRange-back-bar': BarRangeBackBar
    },
    template: `
        <div class="barRange-back">

            <div class="barRange-back-box" :style="boxStyle">

                <v-columns class="barRange-back-columns" gap="12%">

                    <v-column
                        v-for="item in items"
                        :key="item.key"
                    >
                        <barRange-back-bar :idx="item.key" />
                    </v-column>

                </v-columns>

            </div>

        </div>
    `,
    setup(){
        const {ref, onMounted, computed} = Vue
        const {useStore} = Vuex

        const store = useStore()

        const openTime = computed(() => store.getters['test/getOpenTime'])

        const len = 8

        const boxStyle = ref({
            opacity: '0',
            animation: 'none'
        })
        
        const items = ref(Array.from({length: len}, (_, key) => ({key})))

        const open = () => {
            boxStyle.value.animation = `blink2 0.06s ${openTime.value + Math.random()}s 2 forwards`
        }

        onMounted(() => {
            open()
        })

        return{
            items,
            boxStyle
        }
    }
}