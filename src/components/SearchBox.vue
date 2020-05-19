<template>
  <v-sheet elevation="1" class="pa-4 mb-4 d-flex">
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      class="mt-0 pt-0"
    ></v-text-field>
    <slot></slot>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'search-box',
})
export default class SearchBox extends Vue {
  @Prop() readonly value!: string;

  get search(): string {
    return this.value;
  }

  set search(val: string) {
    this.$emit('input', val);
  }
}
</script>
