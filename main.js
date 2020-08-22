const btn = document.querySelector('#btn-kick');

const character = {
    name: 'Pikachu',
    defaultHp: 100,
    damageHp: 100,
    elHp: document.querySelector('#health-character'),
    elPrograssbar: document.querySelector('#progressbar-character'),
};

const enemy = {
    name: 'Charmander',
    defaultHp: 100,
    damageHp: 100,
    elHp: document.querySelector('#health-enemy'),
    elPrograssbar: document.querySelector('#progressbar-enemy'),
};

btn.addEventListener('click', function () {
    console.log('Kick!');
    changeHp(20, character);
    changeHp(20, enemy);
})

function init() {
    console.log('Start Game!');
    renderHp(character);
    renderHp(enemy);
};

function renderHp(person) {
    renderHpLife(person);
    renderPrograssbarHp(person);
};

function renderHpLife(person) {
    person.elHp.innerText = person.damageHp + ' / ' + person.defaultHp;
};

function renderPrograssbarHp(person) {
    person.elPrograssbar.style.width = person.damageHp + '%';
};

function changeHp(count, person) {
    count = random(count);

    if (person.damageHp <= count) {
        person.damageHp = 0;
        alert('Бедный ' + person.name + ' проиграл бой!');
        btn.disabled = true;

    } else {
        person.damageHp -= count;
    }

    renderHp(person);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

init();

const ale = () => {
    console.log('Hello');
}