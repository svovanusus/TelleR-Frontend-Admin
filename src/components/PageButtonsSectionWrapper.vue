<template functional>
  <div class="page-buttons d-flex flex-row mt-4">
    <slot name="left"></slot>
    <div class="ml-auto"></div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.page-buttons::v-deep > *:not(:first-child) {
  margin-left: 12px;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'page-buttons-section-wrapper',
})
export default class PageButtonsSectionWrapper extends Vue {}
</script>
