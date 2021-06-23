<template>
  <button :style="{ backgroundColor: color }">{{ location.toString() }}</button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { familyColors } from "../../../config";
import {
  isFamilyEnhancedLocation,
  LocationFamily,
  LocationFamilyMax,
  LocationGoldKey,
  LocationLocation,
  LocationLvl3,
  LocationLvl4,
  LocationLvl5,
  LocationLvl7,
  LocationPearl,
  LocationSilverKey,
} from "../Location";

@Component
export default class LocationCard extends Vue {
  @Prop({
    required: true,
    type: Object as () =>
      | LocationFamilyMax
      | LocationFamily
      | LocationSilverKey
      | LocationGoldKey
      | LocationLocation
      | LocationPearl
      | LocationLvl3
      | LocationLvl4
      | LocationLvl5
      | LocationLvl7,
  })
  location!:
    | LocationFamilyMax
    | LocationFamily
    | LocationSilverKey
    | LocationGoldKey
    | LocationLocation
    | LocationPearl
    | LocationLvl3
    | LocationLvl4
    | LocationLvl5
    | LocationLvl7;

  get color(): string {
    return isFamilyEnhancedLocation(this.location)
      ? familyColors.get(this.location.getFamily())!
      : "grey";
  }
}
</script>
