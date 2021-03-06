import { generateLog } from './utils.js';
import game from './main.js';

class Selectors {
    constructor(name) {
        this.elHp = document.querySelector(`#health-${name}`);
        this.elPrograssbar = document.querySelector(`#progressbar-${name}`);
        this.elImg = document.querySelector(`.img-${name}`);
        this.elName = document.querySelector(`#name-${name}`);
        this.lvl = document.querySelector(`.${name} .lvl`);
    };
}

class Pokemon extends Selectors {
    constructor({ id, name, hp, type, attacks = [], img, selectors }) {
        super(selectors);
        this.id = id;
        this.name = name;
        this.type = type;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.attacks = attacks;
        this.elImg.src = img;
        this.elName.textContent = name;
        this.selectors = selectors;

        this.renderHp();
    };

    doHit = (opponent, damage) => {
        const { hp, renderHp } = opponent;
        hp.current -= damage;

        if (hp.current <= 0) {
            hp.current = 0;
            if (opponent.selectors === 'player2') {
                game.changeOpponent();
                let newLvl = Number(this.lvl.textContent.slice(-1));
                newLvl++;
                this.lvl.textContent = 'Lv. ' + newLvl;
                renderHp();
                generateLog(this, opponent, damage);
                return true;
            } else {
                game.over();
                renderHp();
                generateLog(this, opponent, damage);
                return false;
            }
        }

        renderHp();
        generateLog(this, opponent, damage);
    };

    renderHp = () => {
        const { elHp, elPrograssbar: bar, hp: { current, total } } = this;
        let percent = current / (total / 100);

        elHp.textContent = current + ' / ' + total;
        bar.style.width = percent + '%';
        this.changeColor(percent, bar);
    };

    changeColor = (percent, bar) => {
        let red, green;

        if (percent > 50) {
            green = 255;
            red = 255 / 50 * (100 - percent);
        } else {
            red = 255;
            green = 255 / 50 * percent;
        }

        bar.style.background = `rgb(${red},${green},0)`;
    };
}

export default Pokemon;