import Pokemon from './pokemon.js';
import random from './utils.js';

const logsDiv = document.querySelector('#logs'),
    btn1 = document.querySelector('#btn1'),
    btn2 = document.querySelector('#btn2');

const player1 = new Pokemon({
    name: 'Pikachu',
    category: 'mouse',
    type: 'electric',
    weakness: ['ground'],
    hp: 500,
    damage: 80,
    selectors: 'character',
});

const player2 = new Pokemon({
    name: 'Charmander',
    category: 'lizard',
    type: 'fire',
    weakness: ['water', 'ground', 'rock'],
    hp: 450,
    damage: 80,
    selectors: 'enemy',
});

const btnThunderJolt = countBtn(6, btn1);
btn1.addEventListener('click', function () {
    btnThunderJolt();
    player2.changeHp(function (count) {
        generateLog(player2, player1, count);
    });
});

const btnElectroBall = countBtn(10, btn2);
btn2.addEventListener('click', function () {
    btnElectroBall();
    player1.changeHp(function (count) {
        generateLog(player1, player2, count);
    });
});

function countBtn(count = 6, el) {
    const text = el.textContent;
    el.textContent = `${text} (${count})`;
    return function () {
        count--;
        if (count === 0) {
            el.disabled = true;
        }
        el.textContent = `${text} (${count})`;
        return count;
    }
};

function generateLog(firstPerson, secondPerson, damage) {
    const { name: firstName, hp: { current, total } } = firstPerson;
    const { secondName } = secondPerson;

    const logs = [
        `${firstName} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага.`,
        `${firstName} поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага.`,
        `${firstName} забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
        `${firstName} пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар.`,
        `${firstName} поперхнулся, но в это время ${secondName} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
        `${firstName} удивился, а ${secondName} пошатнувшись влепил подлый удар.`,
        `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар.`,
        `${firstName} пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника.`,
        `${firstName} расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника.`,
        `${firstName} пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику.`
    ];

    const p = document.createElement('p');
    p.textContent = logs[random(logs.length) - 1] + ` -${damage}, [${current}/${total}]`;
    logsDiv.insertBefore(p, logsDiv.children[0]);
}
