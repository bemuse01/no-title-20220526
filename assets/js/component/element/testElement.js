import TestSearch from './testSearch.js'

export default {
    components: {
        'test-search': TestSearch
    },
    template: `
        <div class="test test-element" :ref="el => root = el">

            <test-search />

        </div>
    `,
    setup(){
    }
}