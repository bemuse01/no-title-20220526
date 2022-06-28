import TestObject from '../object/testObject.js'
import TestElement from '../element/test/testElement.js'
import LineGraphObject from '../object/lineGraphObject.js'
import LineGraphElement from '../element/lineGraph/lineGraphElement.js'
import BarGraphElement from '../element/barGraph/barGraphElement.js'
import BarRangeElement from '../element/barRange/barRangeElement.js'

export default {
    components: {
        'test-object': TestObject,
        'test-element': TestElement,
        'lineGraph-object': LineGraphObject,
        'lineGraph-element': LineGraphElement,
        'barGraph-element': BarGraphElement,
        'barRange-element': BarRangeElement
    },
    template: `
        <div class="vSection-item">

            <template v-if="type === false">
                <test-object />
                <test-element />
            </template>

            <template v-else>

                <template v-if="rand === 0">
                    <lineGraph-object />
                    <lineGraph-element />
                </template>

                <template v-else-if="rand === 1">
                    <barGraph-element />
                </template>
            
            </template>

        </div>
    `,
    props: {
        type: Boolean
    },
    setup(props){
        const {ref} = Vue

        const type = props.type

        const rand = ref(~~(Math.random() * 2))

        return{
            type,
            rand
        }
    }
}