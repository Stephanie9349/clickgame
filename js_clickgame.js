const button = document.querySelector('button');
const second = document.querySelector('.second');
const sec = document.querySelector('#s');
let timeout = 60;
const planets = {
    num1: 'sun.png',
    num2: 'jupiter.png',
    num3: 'earth.png',
    num4: 'venus.png',
    num5: 'mercury.png',
    num6: 'star.png',
    num7: 'meteor.png',
}

function startCount() {
    let appear;
    button.textContent = 'Go!';
    button.removeEventListener('click', startCount);
    let count = setInterval(() => {
        sec.textContent = timeout-- + " seconds left";
        if(timeout < 0) {
            clearInterval(count);
            second.textContent = "Timeout!";
            clearInterval(appear);
        }
    }, 1000);
    appear = setInterval(() => {
        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);
        let planet = Math.floor(Math.random() * 7 + 1);
        let tr = document.querySelectorAll('tr')[row];
        let td = tr.querySelectorAll('td')[column];
        let img = document.createElement('img');
        img.src = planets['num' + planet];
        td.appendChild(img);
        setTimeout(() => {
            td.removeChild(img);
        }, 2000);
    }, (Math.ceil((Math.random() * 1 + 0.9) * 100) / 100) * 1000);
}

button.addEventListener('click', startCount);