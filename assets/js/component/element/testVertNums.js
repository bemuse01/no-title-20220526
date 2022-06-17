export default {
    template: `
        <div class="test-child test-vertNums">

            <div class="vertNums-box">
            
                <div
        
                >
                </div>
            
            </div>

        </div>
    `,
    setup(){
        const {ref} = Vue

        const numbers = ref(Array.from({length: 7}, (_, key) => ({
            key,
            text: ~~(Math.random() * 100000)
        })))

        return{
            numbers
        }
    }
}