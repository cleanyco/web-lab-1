const x = document.getElementById('xcoord')
const y = document.getElementById('ycoord')
const form = document.getElementById('xyform')

form.addEventListener('submit', (e => {
    e.preventDefault()
}))

    if ((y > 5) || (y < -5) || (!y.isFinite())) {
        console.log('Что-то тут не так...');
        return false;
    } else {
        console.log('Всё чисто');
        return true;
        
        // you cannot use a comma instead of a period, the number cannot start from zero, 
        // there should not be extra characters, you need to allow spaces at the beginning and end, but prohibit them in the middle


    }
}
