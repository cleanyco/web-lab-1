$(function() {
    let yCoord = undefined
    let xCoord = undefined
    let rCoord = undefined
    const form = document.getElementById('form')

//fixme можно вводить начиная с нуля
//fixme сделать все требования по наследованию элементов
//fixme проверить инъекцию
//fixme сделать валидацию в пэхэпэ
//fixme баг одной из регулярок (ПОФИКСИТЬ ВЕЗДЕ)
//fixme сделать чтобы таблица генерировалась на новой странице
    function check_y() {
        let valid;
        const startsWithZero = new RegExp("0+\\d+");
        const numberSystems = new RegExp("(0x|0o|0b)\d*")
        const yElement = document.getElementById('ycoord').value
        const y = yElement.replace(',', '.').trim();
        if (isNaN(y) || isNaN(parseFloat(y))) {
            alert('Invalid input!')
            valid = false;
        } else if (parseFloat(y) < -5 || parseFloat(y) > 5) {
            alert('Please enter a number between -5 and 5')
            valid = false;
        } else if (startsWithZero.test(y)){
            alert('Number cannot starts with zero!')
            valid = false;
        } else if (numberSystems.test(y)) {
            alert("You can only enter numbers in decimal notation!");
            valid = false;
        } else {
            yCoord = y
            valid = true;
        }
        return valid;
    }

    function check_x() {
        let valid;
        const startsWithZero = new RegExp("0+\\d+");
        const numberSystems = new RegExp("(0x|0o|0b)\d*")
        //fixme
        const xElement = document.querySelector('input[name="xcoord"]:checked').value
        const x = xElement.replace(',', '.').trim();
        if (isNaN(x) || isNaN(parseFloat(x))) {
            alert('Invalid input!')
            valid = false;
        } else if (parseFloat(x) < -5 || parseFloat(x) > 3) {
            alert('Please enter a number between -5 and 3')
            valid = false;
        } else if (startsWithZero.test(x)){
            alert('Number cannot starts with zero!')
            valid = false;
        } else if (numberSystems.test(x)) {
            alert("You can only enter numbers in decimal notation!");
            valid = false;
        } else {
            xCoord = x
            valid = true;
        }
        return valid;
    }

    function check_r() {
        let valid;
        const startsWithZero = new RegExp("0+\\d+");
        const numberSystems = new RegExp("(0x|0o|0b)\d*")
        const rElement = document.querySelector('input[name="rcoord"]:checked').value
        const r = rElement.replace(',', '.').trim();
        if (isNaN(r) || isNaN(parseFloat(r))) {
            alert('Invalid input!')
            valid = false;
        } else if (parseFloat(r) < -5 || parseFloat(r) > 3) {
            alert('Please enter a number between 1 and 5')
            valid = false;
        } else if (startsWithZero.test(r)){
            alert('Number cannot starts with zero!')
            valid = false;
        } else if (numberSystems.test(r)) {
            alert("You can only enter numbers in decimal notation!");
            valid = false;
        } else {
            rCoord = r
            valid = true;
        }
        return valid;
    }

    function sendPost() {
        const xVal = document.querySelector('input[name="xcoord"]:checked').value
        const rVal = document.querySelector('input[name="rcoord"]:checked').value
        $.ajax({
            url: './scripts/handler.php',
            method: 'POST',
            data: {
                x: xVal,
                y: yCoord,
                r: rVal,
                date: new Date().getTimezoneOffset()
            },
            dataType: 'json',
            success: function(data) {
                if (data.validate) {
                    newRow = '<tr>';
                    newRow += '<td>' + data.xval + '</td>';
                    newRow += '<td>' + data.yval + '</td>';
                    newRow += '<td>' + data.rval + '</td>';
                    newRow += '<td>' + data.curtime + '</td>';
                    newRow += '<td>' + data.exectime + '</td>';
                    newRow += '<td>' + data.hitres + '</td>';
                    $('#result-table').append(newRow);
                }
            },
            error: function(jqXHR, textStatus) {
                alert(`Запрос не был отправлен! Причина: ${jqXHR.statusText}`)
            }
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (check_x() && check_y() && check_r()) {
            sendPost()
        }
    })
});