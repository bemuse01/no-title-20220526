import TestTopCode from './testTopCode.js'

export default {
    components: {
        'test-top-code': TestTopCode
    },
    template: `
        <div class="test-child test-top">

            <div class="top-box">

                <test-top-code width="55%"/>
                <test-top-code width="75%"/>

            </div>

        </div>
    `,
    setup(){
    }
}