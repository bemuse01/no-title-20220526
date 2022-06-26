import TestObject from '../object/testObject.js'
import TestElement from '../element/testElement.js'
import LineGraphObject from '../object/lineGraphObject.js'
import LineGraphElement from '../element/lineGraphElement.js'

export default {
    components: {
        'test-object': TestObject,
        'test-element': TestElement,
        'lineGraph-object': LineGraphObject,
        'lineGraph-element': LineGraphElement
    },
    template: `
        <div class="vSection-item">

            <template v-if="type === false">
                <test-object />
                <test-element />
            </template>

            <template v-else>
                <!--<lineGraph-object />-->
                <!--<lineGraph-element />-->
            </template>

        </div>
    `,
    props: {
        type: Boolean
    },
    setup(props){
        const type = props.type

        return{
            type
        }
    }
}