<template>
  <div>
    <h3>
      {{ playerBoard.getPlayerName() }}
      <span v-if="playerBoard.isPearlMaster">⚪</span>
      <button v-if="!isActive" @click="onActivationClick">Set Active</button>
    </h3>
    <ul>
      <li>Pearls: {{ playerBoard.pearls }}</li>
      <li>Lord Score: {{ playerBoard.lordScore }}</li>
      <li>Coalition Score: {{ playerBoard.coalitionScore }}</li>
      <li>Location Score: {{ playerBoard.locationScore }}</li>
      <li>Total Score: {{ playerBoard.totalScore }}</li>
    </ul>
    <div class="board-wrapper">
      <div class="grid-lords-container">
        <player-board-lord
          class="spot col-1"
          :lord="grid[0]"
        ></player-board-lord>
        <player-board-lord
          class="spot col-3"
          :lord="grid[1]"
        ></player-board-lord>
        <player-board-lord
          class="spot col-5"
          :lord="grid[2]"
        ></player-board-lord>
        <player-board-lord
          class="spot col-7"
          :lord="grid[3]"
        ></player-board-lord>
        <player-board-lord
          class="spot col-9"
          :lord="grid[4]"
        ></player-board-lord>

        <player-board-lord
          class="spot col-2"
          :lord="grid[5]"
        ></player-board-lord>
        <player-board-lord
          class="spot col-4"
          :lord="grid[6]"
        ></player-board-lord>
        <player-board-lord
          class="spot col-6"
          :lord="grid[7]"
        ></player-board-lord>
        <player-board-lord
          class="spot col-8"
          :lord="grid[8]"
        ></player-board-lord>

        <player-board-lord
          class="spot col-3"
          :lord="grid[9]"
        ></player-board-lord>
        <player-board-lord
          class="spot col-5"
          :lord="grid[10]"
        ></player-board-lord>
        <player-board-lord
          class="spot col-7"
          :lord="grid[11]"
        ></player-board-lord>

        <player-board-lord
          class="spot col-4"
          :lord="grid[12]"
        ></player-board-lord>
        <player-board-lord
          class="spot col-6"
          :lord="grid[13]"
        ></player-board-lord>

        <player-board-lord
          class="spot col-5"
          :lord="grid[14]"
        ></player-board-lord>
      </div>
      <div class="grid-locations-container">
        <player-board-location
          v-for="(location, index) in playerBoard.locations"
          :key="index"
          :location="location"
        ></player-board-location>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.board-wrapper {
  display: grid;
  grid-template-columns: min-content min-content;
  grid-gap: 40px;
  justify-items: center;
  justify-content: center;
}

.grid-lords-container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(19, 40px);
  grid-template-rows: repeat(5, 120px);
  margin-top: 5px;
  padding-top: 5px;
  max-width: 940px;
}

.grid-locations-container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 200px 200px;
  grid-auto-rows: 100px;
  margin-top: 5px;
  padding-top: 5px;
}

.col-1 {
  grid-column-start: 1;
  grid-column-end: 4;
}

.col-2 {
  grid-column-start: 3;
  grid-column-end: 6;
}

.col-3 {
  grid-column-start: 5;
  grid-column-end: 8;
}

.col-4 {
  grid-column-start: 7;
  grid-column-end: 10;
}

.col-5 {
  grid-column-start: 9;
  grid-column-end: 12;
}

.col-6 {
  grid-column-start: 11;
  grid-column-end: 14;
}

.col-7 {
  grid-column-start: 13;
  grid-column-end: 16;
}

.col-8 {
  grid-column-start: 15;
  grid-column-end: 18;
}

.col-9 {
  grid-column-start: 17;
  grid-column-end: 20;
}

.spot {
  border: 1px dotted black;
}
</style>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PlayerBoard } from "../PlayerBoard";
import { PlayerBoardLord, PlayerBoardLocation } from "../components";
import { Lord } from "../../lord";

@Component({
  components: {
    PlayerBoardLord,
    PlayerBoardLocation,
  },
})
export default class PlayerBoardView extends Vue {
  @Prop({ required: true, type: Object as () => PlayerBoard })
  private playerBoard!: PlayerBoard;

  @Prop({ required: true, type: Number })
  private playerBoardId!: number;

  @Prop({ required: false, type: Boolean, default: false })
  private isActive!: boolean;

  get grid(): Lord[] {
    return this.playerBoard.getLords();
  }

  onActivationClick(): void {
    this.$emit("boardActivation", this.playerBoardId);
  }
}
</script>
