import Pokemon from './pokemon.js';
import Game from './game.js';
import { random, countBtn, generateLog } from './utils.js';
import { pokemons } from './pokemons.js';

const control = document.querySelector('.control');

const pikachu = pokemons.find(item => item.name === 'Bulbasaur');
const charmander = pokemons.find(item => item.name === 'Charmander');

const player1 = new Pokemon({
    ...pikachu,
    selectors: 'player1',
});

const player2 = new Pokemon({
    ...charmander,
    selectors: 'player2',
});

player1.attacks.forEach(item => {
    const btn = document.createElement('button');
    btn.classList.add('button');
    btn.textContent = item.name;
    const btnCount = countBtn(item.maxCount, btn);
    btn.addEventListener('click', () => {
        btnCount();
        player1.doHit(player2, item);
    });
    control.appendChild(btn);
});

const game = new Game;
game.begin();

export default game;