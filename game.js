import Pokemon from './pokemon.js';
import { countBtn } from './utils.js';

class Selectors {
    constructor() {
        this.playground = document.querySelector('.playground');
        this.logDiv = document.querySelector('#logs');
    };
}

class Game extends Selectors {
    constructor() {
        super();

    };

    getPokemons = async (query = '') => {
        const responce = await fetch(`https://reactmarathon-api.netlify.app/api/pokemons${query}`);
        const body = responce.json();
        return body;
    }

    getDamage = async (player1, player2, hit) => {
        const responce = await fetch(`https://reactmarathon-api.netlify.app/api/fight?player1id=${player1}&attackId=${hit}&player2id=${player2}`);
        const body = responce.json();
        return body;
    }

    doHit = async (btn) => {
        const damage = await this.getDamage(this.player1.id, this.player2.id, btn.id);
        console.log(damage);
        !this.player1.doHit(this.player2, damage.kick.player2) &&
            this.player2.doHit(this.player1, damage.kick.player1);
    }

    begin = async () => {
        this.playground.textContent = '';
        this.logDiv.textContent = '';
        const pokemons = await this.getPokemons();
        pokemons.forEach(item => {
            const { name, img } = item;
            const card = document.createElement('div');
            card.style.cursor = 'pointer';
            card.className = 'pokemon';
            card.innerHTML = `
                <img src="${img}" class="sprite" />
                <div class="details">
                    <h2 class="name">${name}</h2>
                </div>
            `;
            card.addEventListener('click', () => {
                this.start(name);
            });
            this.playground.appendChild(card);
        });

    };

    start = async (name) => {
        this.playground.textContent = '';
        const p1 = await this.getPokemons(`?name=${name}`);
        const p2 = await this.getPokemons('?random=true');

        this.playground.appendChild(this.card('player1'));
        this.playground.appendChild(this.card('control'));
        this.playground.appendChild(this.card('player2'));
        this.control = document.querySelector('.control');

        this.player1 = this.createPlayer(p1, 'player1');
        this.player2 = this.createPlayer(p2, 'player2');
        console.log(this.player1.attacks[0]);

        this.attacks();
    };

    card = (player) => {
        const card = document.createElement('div');

        if (player === 'control') {
            card.className = 'control';
            return card;
        };

        card.className = `pokemon ${player}`;
        card.innerHTML = `
            <span class="lvl">Lv. 1</span>
            <img src="http://sify4321.000webhostapp.com/charmander.png" class="sprite img-${player}" />
            <div class="details">
                <h2 class="name" id="name-${player}">Charmander</h2>
                <div class="hp">
                    <div class="bar">
                        <div class="health" id="progressbar-${player}" style="width: 100%"></div>
                    </div>
                    <span class="text" id="health-${player}">100 / 100</span>
                </div>
            </div>
        `;
        return card;
    };

    attacks = () => {
        this.player1.attacks.forEach(item => {
            const btn = document.createElement('button');
            btn.classList.add('button');
            btn.textContent = item.name;
            const btnCount = countBtn(item.maxCount, btn);
            btn.addEventListener('click', () => {
                btnCount();
                this.doHit(item);
            });
            this.control.appendChild(btn);
        });
    };

    changeOpponent = async () => {
        const p2 = await this.getPokemons('?random=true');
        this.player2 = this.createPlayer(p2, 'player2');
    };

    createPlayer = (who, select) => {
        return new Pokemon({
            ...who,
            selectors: select,
        })
    };

    over = () => {
        const allButtons = document.querySelectorAll('.control .button');
        allButtons.forEach(item => item.remove());
        const newBtn = document.createElement('div');
        newBtn.className = 'button';
        newBtn.innerHTML = `Игра оконченна<br>Начать заново`;
        this.control.appendChild(newBtn);
        newBtn.addEventListener('click', this.begin);
    };
};

export default Game;
