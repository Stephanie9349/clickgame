class Planet {
    constructor(image, score) {
        this.image = image;
        this.score = score;
    }
}

const get_number = (msg, cond) => {
    let ret;

    do
        ret = prompt(msg);
    while (isNaN(ret) || !cond(Number(ret)));

    return Number(ret);
};

const button = document.querySelector('button');
const second = document.querySelector('.second');
const sec    = document.querySelector('#s');

let score    = document.querySelector('.score span');
let clickNum = 0;
let timeout  = 60;

const planets = {
    num1: new Planet('sun.png'    ,   1),
    num2: new Planet('jupiter.png',   5),
    num3: new Planet('earth.png'  ,  10),
    num4: new Planet('venus.png'  ,  15),
    num5: new Planet('mercury.png',  20),
    num6: new Planet('star.png'   ,  25),
    num7: new Planet('meteor.png' , -30),
}

let pNum        = get_number("Enter the number of players."            , x => x > 0           );
let level       = get_number("Enter the level of game to play. (1 ~ 3)", x => 1 <= x && x <= 3);
let appear_time = () => (Math.random() * [1.3, 1.1, 0.99][ level - 1 ] + 0.9) * 1000;

function startCount() {
    ++clickNum;
    let appear;
    button.textContent = 'Go!';
    button.removeEventListener('click', startCount);
    let count = setInterval(() => {
        sec.textContent = timeout-- + " seconds left";

        if (timeout < 0) {
            clearInterval(count);
            sec.textContent = "Timeout!";
            clearInterval(appear);
        }
    }, 1000);

    if (clickNum < pNum && timeout <= 0) {
        timeout            = 60;
        score.textContent  = 0;
        button.textContent = 'Click to start!';
        button.addEventListener('click', startCount);
    }

    appear = setInterval(() => {
        let row    = Math.floor(Math.random() * 7);
        let column = Math.floor(Math.random() * 10);
        let planet = Math.floor(Math.random() * 7 + 1);
        let tr     = document.querySelectorAll('.row')[row];
        let item   = tr.querySelectorAll('.item')[column];
        let img    = document.createElement('img');
        img.src    = planets['num' + planet].image;
        img.classList.add('num'+ planet);
        img.addEventListener('click', getScore);

        function getScore(event) {
            img.removeEventListener('click', getScore);
            score.textContent = Number(score.textContent) + planets[ event.target.classList ].score;
        }

        item.appendChild(img);
        setTimeout(() => item.removeChild(img), 2000);
    }, appear_time());

    setTimeout(() => {
        let eachScore = document.createElement('span');
        let logNum    = clickNum + "P: ";

        eachScore.textContent = logNum + score.textContent;
        document.querySelector('.others').appendChild(eachScore);
        
        timeout            = 60;
        score.textContent  = 0;
        button.textContent = 'Click to start!';

        if (clickNum < pNum)
            button.addEventListener('click', startCount);
        else
            button.textContent = 'Finish!';
    }, 62000);
}

button.addEventListener('click', startCount);