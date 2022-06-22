import TestObject from '../object/testObject.js'
import TestElement from '../element/testElement.js'
import LineGraphObject from '../object/lineGraphObject.js'

export default {
    components: {
        'test-object': TestObject,
        'test-element': TestElement,
        'lineGraph-object': LineGraphObject
    },
    template: `
        <div class="vSection-item">
            <template v-if="type === false">    
                <test-object />
                <test-element />
            </template>
            <template v-else>
                <lineGraph-object />
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