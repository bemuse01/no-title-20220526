import TestTopCode from './testTopCode.js'
import TopCodeNumbers from './topCodeNumbers.js'
import TopCodeFlow from './topCodeFlow.js'

export default {
    components: {
        'test-top-code': TestTopCode,
        'top-code-numbers': TopCodeNumbers,
        'top-code-flow': TopCodeFlow
    },
    template: `
        <div class="test-child test-top">

            <div class="top-box">

                <test-top-code width="50%">

                    <top-code-numbers gap="2%" :len="3" />

                    <div class="top-code-title">

                        <div class="code-title"><span>DNA ANALYSIS</span></div>
                        <top-code-numbers gap="2%" :len="3" />

                    </div>

                </test-top-code>

                <test-top-code width="68%">

                    <top-code-flow />

                </test-top-code>

            </div>

        </div>
    `,
    setup(){
    }
}