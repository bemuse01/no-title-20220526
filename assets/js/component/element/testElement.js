import TestSearch from './testSearch.js'
import TestVertNums from './testVertNums.js'

export default {
    components: {
        'test-search': TestSearch,
        'test-vertNums': TestVertNums
    },
    template: `
        <div class="test test-element">

            <test-search />
            <test-vertNums :rootStyle="leftVertNumsStyle" />
            <test-vertNums :rootStyle="rightVertNumsStyle" />

        </div>
    `,
    setup(){
        const {ref} = Vue

        const leftVertNumsStyle = ref({left: '0'})
        const rightVertNumsStyle = ref({right: '0'})
        
        return{
            leftVertNumsStyle,
            rightVertNumsStyle
        }
    }
}