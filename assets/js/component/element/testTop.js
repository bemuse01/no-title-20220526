import TestTopCode from './testTopCode.js'

export default {
    components: {
        'test-top-code': TestTopCode
    },
    template: `
        <div class="test-child test-top">

            <div class="top-box">

                <test-top-code width="50%"/>
                <test-top-code width="68%"/>

            </div>

        </div>
    `,
    setup(){
    }
}