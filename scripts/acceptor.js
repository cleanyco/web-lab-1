function submitValidation() {
    const formElementXY = document.getElementById('xyform');
    formElementXY.addEventListener('submit', (e) => {
        e.preventDefault();
        const formDataXY = new FormData(formElemXY); 
        const x = formDataXY.get('xcoord');
        const y = formDataXY.get('ycoord');
      });

    const formElementR = document.getElementById('rform')
    formElementR.addEventListener('radio', (e) => {
        e.preventDefault();
        const formDataR = new FormData(formElementR);
        const r = formDataR.get('radius');
    });

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
