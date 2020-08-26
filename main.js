const btn = document.querySelector('#btn-kick'),
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

    str.textContent = current + ' / ' + total;
    bar.style.width = current / (total / 100) + '%';
};

function random(num) {
    return Math.ceil(Math.random() * num);
}

function doHit(opponent) {
    let { name, hp } = opponent;

    const damage = random(this.damage);
    const message = () => alert('Бедный ' + name + ' проиграл бой!');

    hp.current -= damage;

    this === enemy ? generateLog(this, character, damage) : generateLog(this, enemy, damage);

    if (hp.current <= 0) {
        hp.current = 0;
        btn.disabled = true;
        setTimeout(message, 500);
    }

    opponent.render();
}

btn.addEventListener('click', () => {
    console.log('Kick!');
    enemy.hit(character);
    character.hit(enemy);
})

function init() {
    console.log('Start Game!');
    character.render();
    enemy.render();
};

function generateLog(firstPerson, secondPerson, damage) {
    const { name: firstName } = firstPerson;
    const { name, hp: { current, total } } = secondPerson;

    const logs = [
        `${firstName} вспомнил что-то важное, но неожиданно ${name}, не помня себя от испуга, ударил в предплечье врага. -${damage}, [${current}/${total}]`,
        `${firstName} поперхнулся, и за это ${name} с испугу приложил прямой удар коленом в лоб врага. -${damage}, [${current}/${total}]`,
        `${firstName} забылся, но в это время наглый ${name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${damage}, [${current}/${total}]`,
        `${firstName} пришел в себя, но неожиданно ${name} случайно нанес мощнейший удар. -${damage}, [${current}/${total}]`,
        `${firstName} поперхнулся, но в это время ${name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${damage}, [${current}/${total}]`,
        `${firstName} удивился, а ${name} пошатнувшись влепил подлый удар. -${damage}, [${current}/${total}]`,
        `${firstName} высморкался, но неожиданно ${name} провел дробящий удар. -${damage}, [${current}/${total}]`,
        `${firstName} пошатнулся, и внезапно наглый ${name} беспричинно ударил в ногу противника. -${damage}, [${current}/${total}]`,
        `${firstName} расстроился, как вдруг, неожиданно ${name} случайно влепил стопой в живот соперника. -${damage}, [${current}/${total}]`,
        `${firstName} пытался что-то сказать, но вдруг, неожиданно ${name} со скуки, разбил бровь сопернику. -${damage}, [${current}/${total}]`
    ];

    const p = document.createElement('p');
    p.textContent = logs[random(logs.length) - 1];
    logsDiv.insertBefore(p, logsDiv.children[0]);
}

init();
