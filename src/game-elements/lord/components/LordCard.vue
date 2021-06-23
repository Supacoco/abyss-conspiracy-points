<template>
  <button :style="{ backgroundColor: color }">{{ lord.value }}</button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Lord } from "../Lord";

import { familyColors } from "../../../config";

@Component
export default class LordCard extends Vue {
  @Prop({ required: true, type: Object as () => Lord })
  lord!: Lord;

  get color(): string {
    return familyColors.get(this.lord.getFamily())!;
  }
}
</script>
