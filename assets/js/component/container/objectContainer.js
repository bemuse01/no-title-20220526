import TestObject from '../object/testObject.js'

export default {
    components: {
        'test-object': TestObject
    },
    template: `
        <div id="object-container">

            <test-object />

        </div>
    `
}