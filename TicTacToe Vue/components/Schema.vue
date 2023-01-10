<script setup>
import {TicTacToe} from "@/common/TicTacToe";</script>

<template>
  <div class="mainpanel">
    <template v-for="r in this.model.size">
      <template v-for="c in this.model.size">
        <Cell :controller="model" :i="r-1" :j="c-1" @add-symbol="(i,j) => this.model.addSymbolAt(i, j)"></Cell>
      </template>
    </template>
  </div>
  <div class="messagearea">
    <p v-if="this.model.isGameOver()">Game is over!</p>
    <p v-if="this.model.isDraw()">Match is draw!</p>
    <p v-if="this.model.schema.winner===TicTacToe.CROSS">Cross has win!</p>
    <p v-if="this.model.schema.winner===TicTacToe.CIRCLE">Circle has win!</p>
    <button v-if="this.model.isGameOver()" @click="this.model.clear()">Reset</button>
  </div>
</template>

<script>
import {TTTController} from "@/common/TTTController";
import {TicTacToe} from "@/common/TicTacToe";

export default {
  name: "Schema",
  data() {
    return {
      model:  new TTTController(3)
    }
  },
}
</script>

<style scoped>
.mainpanel {
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: auto auto auto;
}

.messagearea {
  text-align: center;
  justify-content: center;
}
</style>