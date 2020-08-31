const firstBtn = document.querySelector('#first-btn'),
    control = document.querySelector('.control'),
    logsDiv = document.querySelector('#logs');

const character = {
    name: 'Pikachu',
    category: 'mouse',
    type: 'electric',
    weakness: ['ground'],
    hp: {
        current: 100,
        total: 100,
    },
    damage: 20,
    elHp: document.querySelector('#health-character'),
    elPrograssbar: document.querySelector('#progressbar-character'),
    render: renderHp,
    hit: doHit,
};

const enemy = {
    name: 'Charmander',
    category: 'lizard',
    type: 'fire',
    weakness: ['water', 'ground', 'rock'],
    hp: {
        current: 100,
        total: 100,
    },
    damage: 20,
    elHp: document.querySelector('#health-enemy'),
    elPrograssbar: document.querySelector('#progressbar-enemy'),
    render: renderHp,
    hit: doHit,
};

function renderHp() {
    const { elHp: str, elPrograssbar: bar, hp: { current, total } } = this;
    let percent = current / (total / 100);

    str.textContent = current + ' / ' + total;
    bar.style.width = percent + '%';
    changeColor(percent, bar);
};

function changeColor(percent, bar) {
    let red, green;

    if (percent > 50) {
        green = 255;
        red = 255 / 50 * (100 - percent);
    } else {
        red = 255;
        green = 255 / 50 * percent;
    }

    bar.style.background = `rgb(${red},${green},0)`;
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

function doHit(opponent) {
    let { name, hp } = opponent;

    const damage = random(this.damage);
    const message = () => alert('Бедный ' + name + ' проиграл бой!');
    const list = control.children;

    hp.current -= damage;

    this === enemy ? generateLog(this, character, damage) : generateLog(this, enemy, damage);

    if (hp.current <= 0) {
        hp.current = 0;
        for (let i = 0; i < list.length; i++) {
            list[i].disabled = true;
        }
        setTimeout(message, 500);
    }

    opponent.render();
}

const counter1 = countClick(1);
const counter2 = countClick(2);

control.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('first')) {
        character.hit(enemy);
        counter1();
    }

    if (target.classList.contains('second')) {
        enemy.hit(character);
        counter2();
    }
});

function countClick(num) {
    let count = 0;

    return function () {
        if (count !== 5) {
            count++
        } else {
            count++;
            control.children[num - 1].disabled = true;
        }

        control.children[num - 1].textContent = count;
    }
}

function init() {
    console.log('Start Game!');
    character.render();
    enemy.render();
};

function generateLog(firstPerson, secondPerson, damage) {
    const { name: firstName } = firstPerson;
    const { name, hp: { current, total } } = secondPerson;

    const logs = [
        `${firstName} вспомнил что-то важное, но неожиданно ${name}, не помня себя от испуга, ударил в предплечье врага.`,
        `${firstName} поперхнулся, и за это ${name} с испугу приложил прямой удар коленом в лоб врага.`,
        `${firstName} забылся, но в это время наглый ${name}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
        `${firstName} пришел в себя, но неожиданно ${name} случайно нанес мощнейший удар.`,
        `${firstName} поперхнулся, но в это время ${name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
        `${firstName} удивился, а ${name} пошатнувшись влепил подлый удар.`,
        `${firstName} высморкался, но неожиданно ${name} провел дробящий удар.`,
        `${firstName} пошатнулся, и внезапно наглый ${name} беспричинно ударил в ногу противника.`,
        `${firstName} расстроился, как вдруг, неожиданно ${name} случайно влепил стопой в живот соперника.`,
        `${firstName} пытался что-то сказать, но вдруг, неожиданно ${name} со скуки, разбил бровь сопернику.`
    ];

    const p = document.createElement('p');
    p.textContent = logs[random(logs.length) - 1] + `<b> -${damage}, [${current}/${total}]</b>`;
    logsDiv.insertBefore(p, logsDiv.children[0]);
}

init();
