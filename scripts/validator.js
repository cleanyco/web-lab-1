const x = document.querySelector('input[name="xcoord"]:checked').value
const r = document.querySelector('input[name="rcoord"]:checked').value 
let yCoord = undefined 
const form = document.getElementById('form')
const errorElement = document.getElementById('error');

function check_y() {
    let valid = false;

    const yElement = document.getElementById('ycoord').value;
    const y = yElement.replace(',', '.').trim();
    if (isNaN(y) || isNaN(parseFloat(y))) {
        alert('Invalid input!')
    } else if (parseFloat(y) < -5 || parseFloat(y) > 5) {
        alert('Please enter a number between -5 and 5')
        valid = false;
    } else {
        yCoord = y
        valid = true;
    } 
    return valid;
}

function sendPost() {
    $.ajax({
        url: 'handler.php',
        method: 'post',
        dataType: 'json',
        data: {
            x: x,
            y: yCoord,
            r: r
        },
        success: function() {
            alert('Запрос был отправлен!')
        },
        error: function() {
            alert('Запрос не был отправлен!')
        }
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (check_y()) {
        // var img = document.createElement("img");
        // img.src = "images/yep.gif";
        // var src = document.getElementById("header");
        // src.appendChild(img);
        sendPost()
    } else {
        // var img = document.createElement("img");
        // img.src = "images/yep.gif";
        // var src = document.getElementById("header");
        // src.appendChild(img);
    }
})