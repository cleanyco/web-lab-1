var x = document.getElementById('xcoord')
//FIXME
var y = document.getElementById('ycoord')
var r = document.getElementById('radius')
const form = document.getElementById('form')
var errorElement = document.getElementById('error')

const regexDifferentBase = '(0|0x|e|Ob|0B)[0-9].*';
//FIXME
const regexCommaInTheNumber = '\d+,\d*'

//FIXME print only one error message (?)
function validateForm(y) {
    form.addEventListener('submit', (e => {
        e.preventDefault()
        let message = ''

        // if (yNumeric == null) {
        //     messages.push('Number cannot be null!')
        //     errorElement.innerText = messages.join(', ')
        // }

        if (y.value.match(regexDifferentBase)) {
            message = 'Required input in decimal!'
            errorElement.innerText = message
            return false
        }

        if (y.value.match(regexCommaInTheNumber)) {
            message = 'Use a dot instead of a comma!'
            errorElement.innerText = message

        }

        const yNumeric = Number(y.value.trim());
        debugger

        if (yNumeric === NaN) {
            message = 'Invalid input!'
            errorElement.innerText = message
            return false
        }

        //FIXME check should be at the end
        if (yNumeric > 5 || yNumeric < -5) {
            message = 'Number out of range!'
            errorElement.innerText = message
            return false
        }
        // you cannot use a comma instead of a period, the number cannot start from zero, 
    //         // there should not be extra characters, you need to allow spaces at the beginning and end, but prohibit them in the middle
    })) 
}
