<template>
  <v-app id="teller-admin">
    <top-navbar />

    <left-navbar v-if="isAuthorized" />

    <v-content>
      <v-sheet class="px-4 py-2" light tile>
        <v-fade-transition hide-on-leave>
          <router-view />
        </v-fade-transition>
      </v-sheet>
    </v-content>

    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { Modules as StoreModules, RootState } from '@/store/root-types';
import { State as AuthStoreState } from '@/store/modules/auth';

@Component({
  name: 'app',
  components: {
    TopNavbar: () => import('@/layouts/TopNavbar.vue'),
    LeftNavbar: () => import('@/layouts/LeftNavbar.vue'),
  },
})
export default class App extends Vue {
  rootStoreState: RootState = this.$store.state;

  authStoreState: AuthStoreState = this.$store.state[StoreModules.auth];

  get isLoading(): boolean {
    return this.rootStoreState.isLoading;
  }

  get isAuthorized(): boolean {
    return this.authStoreState.isAuthorized;
  }
}
</script>
