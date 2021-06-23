<template>
  <button style="background-color: DarkKhaki">{{ token.value }}</button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { SpecialToken } from "../SpecialToken";

@Component
export default class SpecialTokenCard extends Vue {
  @Prop({ required: true, type: Object as () => SpecialToken })
  token!: SpecialToken;
}
</script>
