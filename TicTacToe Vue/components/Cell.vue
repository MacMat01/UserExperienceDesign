<script setup>
</script>

<template>
  <div class="cell"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="$emit('addSymbol',this.i, this.j)">
    <img v-if="hover && isEmpty && !isOver" :src="movingImage" width="100" height="100" :alt="label"/>
    <img v-if="!isEmpty" :src="symbolImage" width="100" height="100" :alt="label"/>
  </div>
</template>

<script>
import {TicTacToe} from "@/common/TicTacToe";

import circleMovingImage from '@/assets/images/circle_moving.png';
import crossMovingImage from '@/assets/images/cross_moving.png';
import crossImage from '@/assets/images/cross.png';
import circleImage from '@/assets/images/circle.png';
import crossWinningImage from '@/assets/images/cross_winner.png'
import circleWinningImage from '@/assets/images/circle_winner.png'

import {TTTController} from "@/common/TTTController";

export default {
  name: "Cell",
  props: {
    controller: TTTController,
    i: Number,
    j: Number
  },
  data () {
    return {
      hover: false,
    }
  },
  computed: {
    label() {
      return `(${this.i}, ${this.j})->(${this.isEmpty})`
    },
    isEmpty() {
      return this.controller.isEmpty(this.i, this.j);
    },
    isOver() {
      return this.controller.isGameOver();
    },
    movingImage() {
      if (this.isEmpty) {
        if (this.controller.currentSymbol===TicTacToe.CROSS) {
          return crossMovingImage;
        }
        if (this.controller.currentSymbol===TicTacToe.CIRCLE) {
          return circleMovingImage;
        }
      }
      return '';
    },
    symbolImage() {
      if (this.controller.getSymbolAt(this.i, this.j)===TicTacToe.CROSS) {
        if (this.controller.isAWinnerLocation(this.i, this.j)) {
          return crossWinningImage;
        } else {
          return crossImage;
        }
      }
      if (this.controller.getSymbolAt(this.i, this.j)===TicTacToe.CIRCLE) {
        if (this.controller.isAWinnerLocation(this.i, this.j)) {
          return circleWinningImage;
        } else {
          return circleImage;
        }
      }
    }
  }
}
</script>

<style scoped>
.cell {
  border: 1px solid black;
  width: 100px;
  height: 100px;
  background-size: 100px;
  background: white;
}

</style>