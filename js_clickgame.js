const button = document.querySelector('button');
const second = document.querySelector('.second');
const sec = document.querySelector('#s');
let score = document.querySelector('.score span');

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
        img.classList.add('num'+ planet);
        img.addEventListener('click', getScore);
        function getScore(event) {
            img.removeEventListener('click', getScore);
            if(event.target.classList.contains("num1")) {
                score.textContent = Number(score.textContent) + 1;
                return;
            }
            if(event.target.classList.contains("num2")) {
                score.textContent = Number(score.textContent) + 5;
                return;
            }
            if(event.target.classList.contains("num3")) {
                score.textContent = Number(score.textContent) + 10;
                return;
            }
            if(event.target.classList.contains("num4")) {
                score.textContent = Number(score.textContent) + 15;
                return;
            }
            if(event.target.classList.contains("num5")) {
                score.textContent = Number(score.textContent) + 20;
                return;
            }
            if(event.target.classList.contains("num6")) {
                score.textContent = Number(score.textContent) + 25;
                return;
            }
            if(event.target.classList.contains("num7")) {
                score.textContent = Number(score.textContent) - 30;
                return;
            }
        }
        td.appendChild(img);
        setTimeout(() => {
            td.removeChild(img);
        }, 2000);
    }, (Math.ceil((Math.random() * 1 + 0.9) * 100) / 100) * 1000);
}

button.addEventListener('click', startCount);