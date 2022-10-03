var x = document.getElementById('xcoord')
//FIXME
var y = document.getElementById('ycoord')
var r = document.getElementById('radius')
const form = document.getElementById('form')
var errorElement = document.getElementById('error')
var successMessage = 'You right!'
//FIXME
const regexDifferentBase = new RegExp('\s*(0|0x|e|0b|0B)[0-9].*\s*');
const regexStartsWithDot = new RegExp('\s*\.\d+\s*');
const regexEndsWithDot = new RegExp('\s*\d+\.\s*');
// const regexCommaInTheNumber = '\s*\d+,\d*\s*'

//FIXME print only one error message (?)
function validateForm(y) {
    form.addEventListener('submit', (e => {
        e.preventDefault()
        let message = ''

        // if (yNumeric == null) {
        //     messages.push('Number cannot be null!')
        //     errorElement.innerText = messages.join(', ')
        // }

        if (regexDifferentBase.test(y.value)) {
            message = 'Required input in decimal!'
            errorElement.innerText = message
            return false
        }
        debugger

        if (regexStartsWithDot.test(y.value) || regexEndsWithDot.test(y.value)) {
            message = 'Invalid input of float number!'
            errorElement.innerText = message;
            return false;
        }
        // if (y.value.match(regexCommaInTheNumber)) {
        //     message = 'Use a dot instead of a comma!'
        //     errorElement.innerText = message

        // }

        const yNumeric = Number(y.value.trim());
        debugger

        if (Number.isNaN(yNumeric)) {
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
        
        successMessage.innerText;
        return true
        // you cannot use a comma instead of a period, the number cannot start from zero, 
    //         // there should not be extra characters, you need to allow spaces at the beginning and end, but prohibit them in the middle
    }))
} 
    
    var canSend = validateForm(y);
    debugger       
     if (canSend) {
        var coordinates = {
            xCoord: x,
            yCoord: y,
             rRadius: r
        }
                  var request = new XMLHttpRequest()
        request.open('POST', scripts/handler.php)
        request.send(JSON.stringify(coordinates))
        request.responseType = 'json'
        }