<template>
  <v-app-bar
    app
    color="primary"
    dark
    clipped-left
    elevate-on-scroll
  >
    <v-app-bar-nav-icon
     v-if="isAuthorized"
      @click.stop="isLeftNavbarShown = !isLeftNavbarShown"
      class="hidden-md-and-up"
    />
    <v-toolbar-title class="pl-md-0">TelleR</v-toolbar-title>
    <v-spacer />
    <user-bar v-if="isAuthorized" />
  </v-app-bar>
</template>

<style lang="scss" scoped>
::v-deep .v-toolbar__content {
  padding-top: 0;
  padding-bottom: 0;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { RootState } from '@/store';

import UserBar from '@/layouts/UserBar.vue';

@Component({
  name: 'top-navbar',
  components: {
    UserBar,
  },
})
export default class TopNavbar extends Vue {
  storeRootState: RootState = this.$store.state;

  get isAuthorized(): boolean {
    return this.storeRootState.isAuthorized;
  }

  get isLeftNavbarShown(): boolean | null {
    return this.storeRootState.isLeftNavbarOpen;
  }

  set isLeftNavbarShown(val: boolean | null) {
    this.storeRootState.isLeftNavbarOpen = val;
  }
}
</script>
