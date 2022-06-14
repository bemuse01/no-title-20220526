import TestObject from '../object/testObject.js'
import TestElement from '../element/testElement.js'

export default {
    components: {
        'test-object': TestObject,
        'test-element': TestElement
    },
    template: `
        <div class="vSection-item object-item">
            <template v-if="type === 'Test'">    
                <test-object />
                <test-element />
            </template>
        </div>
    `,
    props: {
        type: {
            default: 'Test',
            type: String
        }
    },
    setup(props){
        const type = props.type

        return{
            type
        }
    }
}