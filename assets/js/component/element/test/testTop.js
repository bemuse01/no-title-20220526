// import TestTopCode from './testTopCode.js'
// import TestTopCodeNumbers from './testTopCodeNumbers.js'
// import TestTopCodeFlow from './testTopCodeFlow.js'

const TestTop = {
    components: {
        'test-top-code': TestTopCode,
        'test-top-code-numbers': TestTopCodeNumbers,
        'test-top-code-flow': TestTopCodeFlow
    },
    template: `
        <div class="test-child test-top">

            <div class="top-box">

                <test-top-code width="50%">

                    <test-top-code-numbers gap="2%" :len="3" />

                    <div class="top-code-title">

                        <div class="code-title"><span>DNA ANALYSIS</span></div>
                        <test-top-code-numbers gap="2%" :len="3" />

                    </div>

                </test-top-code>

                <test-top-code width="68%">

                    <test-top-code-flow />

                </test-top-code>

            </div>

        </div>
    `,
    setup(){
    }
}