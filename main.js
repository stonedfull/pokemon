const btn = document.querySelector('#btn-kick');

const character = {
    name: 'Pikachu',
    defaultHp: 200,
    damageHp: 100,
    damage: 20,
    isEnemy: false,
    elHp: document.querySelector('#health-character'),
    elPrograssbar: document.querySelector('#progressbar-character'),
    render: renderHp,
    hit: doHit,
};

const enemy = {
    name: 'Charmander',
    defaultHp: 100,
    damageHp: 100,
    damage: 20,
    isEnemy: true,
    elHp: document.querySelector('#health-enemy'),
    elPrograssbar: document.querySelector('#progressbar-enemy'),
    render: renderHp,
    hit: doHit,
};

function renderHp() {
    this.elHp.textContent = this.damageHp + ' / ' + this.defaultHp;
    this.elPrograssbar.style.width = this.damageHp / (this.defaultHp / 100) + '%';
};

function doHit() {
    function random(max) {
        let min = max - 8;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let damage = random(this.damage), opponent;
    this.isEnemy ? opponent = character : opponent = enemy;
    const message = () => alert('Бедный ' + opponent.name + ' проиграл бой!');

    if (opponent.damageHp <= damage) {
        opponent.damageHp = 0;
        btn.disabled = true;
        setTimeout(message, 500);
    } else {
        opponent.damageHp -= damage;
    }

    opponent.render();
}

btn.addEventListener('click', () => {
    console.log('Kick!');
    enemy.hit();
    character.hit();
})

function init() {
    console.log('Start Game!');
    character.render();
    enemy.render();
};

init();
