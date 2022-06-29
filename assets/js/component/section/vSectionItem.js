import TestObject from '../object/testObject.js'
import TestElement from '../element/test/testElement.js'
import LineGraphObject from '../object/lineGraphObject.js'
import LineGraphElement from '../element/lineGraph/lineGraphElement.js'
import BarGraphElement from '../element/barGraph/barGraphElement.js'
import BarRangeElement from '../element/barRange/barRangeElement.js'
import CircleGraphObject from '../object/circleGraphObject.js'
import CircleGraphElement from '../element/circleGraph/circleGraphElement.js'
import GraphObject from '../object/graphObject.js'
import GraphElement from '../element/graph/graphElement.js'

export default {
    components: {
        'test-object': TestObject,
        'test-element': TestElement,
        'lineGraph-object': LineGraphObject,
        'lineGraph-element': LineGraphElement,
        'barGraph-element': BarGraphElement,
        'barRange-element': BarRangeElement,
        'circleGraph-object': CircleGraphObject,
        'circleGraph-element': CircleGraphElement,
        'graph-object': GraphObject,
        'graph-element': GraphElement,
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

                <template v-else-if="rand === 2">
                    <barRange-element />
                </template>

                <template v-else-if="rand === 3">
                    <circleGraph-object />
                    <circleGraph-element />
                </template>

                <template v-else>
                    <graph-object />
                    <graph-element />
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

        const rand = ref(~~(Math.random() * 5))
        // const rand = ref(4)

        return{
            type,
            rand
        }
    }
}