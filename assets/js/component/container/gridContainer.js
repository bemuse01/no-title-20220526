import vSection from '../section/vSection.js'
import vSectionBox from '../section/vSectionBox.js'
import vSectionElementItem from '../section/vSectionElementItem.js'

export default {
    components: {
        'v-section': vSection,
        'v-section-box': vSectionBox,
        'v-section-element-item': vSectionElementItem
    },
    template: `
        <div id="grid-container">

            <v-section :params="centerSection">

                <v-section-box class="vSection-box-center" :params="centerSection">
                </v-section-box>

            </v-section>

            <v-section :params="topSection">

                <v-section-box class="vSection-box-top" :params="topSection">
                    <v-section-element-item />
                </v-section-box>

            </v-section>

            <v-section :params="rightSection">
                
                <v-section-box class="vSection-box-right" :params="rightSection">
                </v-section-box>
            
            </v-section>

            <v-section :params="bottomSection">

                <v-section-box class="vSection-box-bottom" :params="bottomSection">
                </v-section-box>

            </v-section>

            <v-section :params="leftSection">

                <v-section-box class="vSection-box-left" :params="leftSection">
                </v-section-box>

            </v-section>
            
        </div>
    `,
    setup(){
        const {ref} = Vue

        const size = 80

        const centerSection = ref({
            style: {gridArea: 'center'},
            position: 'center',
        })
        const topSection = ref({
            style: {gridArea: 'top'},
            position: 'top',
            size
        })
        const rightSection = ref({
            style: {gridArea: 'right'},
            position: 'right',
            size
        })
        const bottomSection = ref({
            style: {gridArea: 'bottom'},
            position: 'bottom',
            size
        })
        const leftSection = ref({
            style: {gridArea: 'left'},
            position: 'left',
            size
        })

        const centerItems = ref(Array.from({length: 0}, (_, key) => ({key})))
        const topItems = ref(Array.from({length: 0}, (_, key) => ({key})))
        const rightItems = ref(Array.from({length: 0}, (_, key) => ({key})))
        const bottomItems = ref(Array.from({length: 0}, (_, key) => ({key})))
        const leftItems = ref(Array.from({length: 0}, (_, key) => ({key})))

        return{
            centerSection,
            leftSection,
            topSection,
            rightSection,
            bottomSection
        }
    }
}