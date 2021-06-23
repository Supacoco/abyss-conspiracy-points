<template>
  <div
    :style="{
      backgroundColor: color,
    }"
    class="player-board-location"
  >
    {{ location }}
  </div>
</template>
<style lang="scss" scoped>
.player-board-location {
  display: flex;
  width: 200px;
  height: 100px;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
}
</style>
<script lang="ts">
import { Location, isFamilyEnhancedLocation } from "../../location";
import { Component, Prop, Vue } from "vue-property-decorator";
import { familyColors } from "../../../config";

@Component
export default class PlayerBoardLocation extends Vue {
  @Prop({ required: true, type: Object as () => Location, default: null })
  private location!: Location;

  get color(): string {
    return isFamilyEnhancedLocation(this.location)
      ? familyColors.get(this.location.getFamily())!
      : "grey";
  }
}
</script>
