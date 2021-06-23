<template>
  <div
    :style="{
      backgroundColor: color,
    }"
    class="player-board-lord"
  >
    {{ lord ? lord.value : "" }}
  </div>
</template>
<style lang="scss" scoped>
.player-board-lord {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
}
</style>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { familyColors } from "../../../config";
import { Lord } from "../../lord";

@Component
export default class PlayerBoardLord extends Vue {
  @Prop({ required: false, type: Object as () => Lord, default: null })
  private lord!: Lord | null;

  get color(): string {
    return this.lord ? familyColors.get(this.lord.getFamily())! : "";
  }
}
</script>
