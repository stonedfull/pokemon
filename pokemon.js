import random from './utils.js';

class Selectors {
    constructor(name) {
        this.elHp = document.querySelector(`#health-${name}`);
        this.elPrograssbar = document.querySelector(`#progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({ name, category, type, weakness, hp, damage, selectors, }) {
        super(selectors);
        this.name = name;
        this.category = category;
        this.type = type;
        this.weakness = weakness;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.damage = damage;

        this.renderHp();
    }

    changeHp = (cb) => {
        const { hp, damage, renderHp } = this;

        const count = random(damage, damage - 10);
        hp.current -= count;

        if (hp.current <= 0) {
            hp.current = 0;
        }

        renderHp();
        cb && cb(count);
    }

    renderHp = () => {
        const { elHp: str, elPrograssbar: bar, hp: { current, total } } = this;
        let percent = current / (total / 100);

        str.textContent = current + ' / ' + total;
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
    }
}

export default Pokemon;