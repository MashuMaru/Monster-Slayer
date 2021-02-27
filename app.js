function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data: function() {
        return {
            playerHealth: 100, 
            monsterHealth: 100,
        }
    }, 
    methods: {
        attackMonster() {
            console.log(this.monsterHealth);
            const attackValue = getRandomNumber(5, 12);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.attackPlayer();
        }, 
        attackPlayer() {
            console.log(this.playerHealth);
            const attackValue = getRandomNumber(8, 15);
            this.playerHealth = this.playerHealth - attackValue;
        }
    }
})

app.mount('#game'); 