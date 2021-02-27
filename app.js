function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data: function () {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: []
    };
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    attackMonster() {
      console.log("Monster Health: " + this.monsterHealth);
      console.log("Round: " + this.currentRound);
      const attackValue = getRandomNumber(5, 12);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.currentRound++;
      this.addLogMessage('Player', 'Attack', attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      console.log("Player Health: " + this.playerHealth);
      const attackValue = getRandomNumber(8, 15);
      this.playerHealth = this.playerHealth - attackValue;
      this.addLogMessage('Monster', 'Attack', attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      console.log("Round: " + this.currentRound);
      const attackValue = getRandomNumber(10, 25);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.addLogMessage('Player', 'Attack', attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      console.log("Player health: " + this.playerHealth);
      const healValue = getRandomNumber(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth = this.playerHealth + healValue;
      }
      this.addLogMessage('Player', 'Heal', healValue);
      this.attackPlayer();
    },
    surrender() {
        this.winner = 'monster';
    },
    addLogMessage(who, what, value) {
        this.logMessages.unshift({
            actionBy: who, 
            actionType: what, 
            actionValue: value
        });
    }
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      } else {
        return { width: this.monsterHealth + "%" };
      }
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      } else {
        return { width: this.playerHealth + "%" };
      }
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 != 0;
    },
  },
});

app.mount("#game");
