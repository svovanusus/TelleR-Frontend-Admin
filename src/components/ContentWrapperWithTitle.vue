<template>
  <div :class="`content-section ${customSectionClass || ''}`">
    <h1 class="display-1 mb2">{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'content-wrapper-with-title',
  components: {},
})
export default class ContentWrapperWithTitle extends Vue {
  @Prop({ default: 'Section Title' }) readonly title!: string;

  @Prop() readonly customSectionClass?: string;
}
</script>
