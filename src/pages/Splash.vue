<template>
  <div class="container">
    <router-link
      class="player-count"
      v-for="playerCount in playerRange"
      :key="playerCount"
      :to="{
        name: 'game-page',
        params: {
          playerCount: playerCount,
        },
      }"
    >
      {{ playerCount }}
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 480px;
  grid-gap: 10px;
}

.player-count {
  font-size: 6rem;
  background-color: orchid;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { MINIMUM_PLAYER, MAXIMUM_PLAYER } from "../rules/config";

@Component
export default class Splash extends Vue {
  get playerRange(): number[] {
    return Array(MAXIMUM_PLAYER - MINIMUM_PLAYER + 1)
      .fill(null)
      .map((_, index) => MINIMUM_PLAYER + index);
  }
}
</script>
