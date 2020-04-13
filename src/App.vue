<template>
  <v-app id="teller-admin">
    <top-navbar />

    <left-navbar v-if="isAuthorized" />

    <v-content>
      <router-view />
    </v-content>

    <!--main-footer />-->
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import TopNavbar from '@/layouts/TopNavbar.vue';
import LeftNavbar from '@/layouts/LeftNavbar.vue';
import MainFooter from '@/layouts/MainFooter.vue';
import { RootState } from '@/store';

@Component({
  name: 'app',
  components: {
    TopNavbar,
    LeftNavbar,
    MainFooter,
  },
})
export default class App extends Vue {
  storeRootState: RootState = this.$store.state;

  get isAuthorized(): boolean {
    return this.storeRootState.isAuthorized;
  }
}
</script>
