"use strict";

$(function() {
    let yCoord = undefined
    const form = document.getElementById('form')

//fixme сделать все требования по наследованию элементов

    function check_y() {
        let valid;
        const startsWithZero = new RegExp("^0+\\d+$");
        const numberSystems = new RegExp("(0x|0o|0b)\d*")
        const yElement = document.getElementById('ycoord').value
        const y = yElement.replace(',', '.').trim();

        if (y.length > 14) {
            alert('Input is too long! Max length: 14')
            return false
        }
        if (isNaN(y) || isNaN(parseFloat(y))) {
            alert('Invalid input!')
            valid = false;
        } else if (startsWithZero.test(y)){
            alert('Number cannot starts with zero!')
            valid = false;
        } else if (numberSystems.test(y)) {
            alert("You can only enter numbers in decimal notation!");
            valid = false;
        } else if (parseFloat(y) < -5 || parseFloat(y) > 5) {
            alert('Please enter a number between -5 and 5')
            valid = false;
        } else {
            yCoord = y
            valid = true;
        }
        return valid;
    }

    function check_x() {
        let valid = false;
        let xValues = ['-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3']
        const xElement = document.querySelector('input[name="xcoord"]:checked').value
        const x = xElement.replace(',', '.').trim();


        if (x.length > 14) {
            alert('Input is too long! Max length: 14')
            return false
        }
        /*
        блок регулярок <3
        */
        const startsWithZero = new RegExp("^0+\\d+$");
        const numberSystems = new RegExp("(0x|0o|0b)\d*")

        if (startsWithZero.test(x)) {
            alert('There must be no zeros at the beginning of an integer!\n')
            return valid
        }

        if (numberSystems.test(x)) {
            alert('Use decimal bro')
            return valid
        }

        xValues.forEach(function (avalValue) {
            if (x === avalValue) {
                valid = true
                return valid
            }
        })

        if (!valid) {
            alert('I\'m sorry, but X value is incorrect!')
        }

        return valid

    }

    function check_r() {
        let valid = false;
        let rValues = ['1', '2', '3', '4', '5']
        const rElement = document.querySelector('input[name="rcoord"]:checked').value
        const r = rElement.replace(',', '.').trim();

        if (r.length > 14) {
            alert('Input is too long! Max length: 14')
            return false
        }

        /*
        блок регулярок <3
        */
        const startsWithZero = new RegExp("^0+\\d+$");
        const numberSystems = new RegExp("(0x|0o|0b)\d*")

        if (startsWithZero.test(r)) {
            alert('There must be no zeros at the beginning of an integer!\n')
            return valid
        }

        if (numberSystems.test(r)) {
            alert('Use decimal bro')
            return valid
        }

        rValues.forEach(function (avalValue, index,  xValues) {
            if (r === avalValue) {
                valid = true
                return valid
            }
        })

        if (!valid) {
            alert('I\'m sorry, but R value is incorrect!')
        }
        return valid
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
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (check_x() && check_y() && check_r()) {
            sendPost()
        }
    })
});