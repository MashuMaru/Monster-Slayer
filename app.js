function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data: function() {
        return {
            playerHealth: 100, 
            monsterHealth: 100,
            currentRound: 0
        }
    }, 
    methods: {
        attackMonster() {
            console.log('Monster Health: ' + this.monsterHealth);
            console.log('Round: ' + this.currentRound);
            const attackValue = getRandomNumber(5, 12);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.currentRound++;
            this.attackPlayer();
        }, 
        attackPlayer() {
            console.log('Player Health: ' + this.playerHealth);
            const attackValue = getRandomNumber(8, 15);
            this.playerHealth = this.playerHealth - attackValue;
        }, 
        specialAttackMonster() {
            const attackValue = getRandomNumber(10, 25);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.currentRound ++;
            this.attackPlayer();
        }
    }, 
    computed: {
        monsterBarStyles() {
            return {width: this.monsterHealth + '%'};
        }, 
        playerBarStyles() {
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 != 0;
        }
    }
})

app.mount('#game'); 