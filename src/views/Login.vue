<template>
  <v-sheet color="white" tile>
    <h1>LOGIN</h1>
    <v-btn
      dark
      @click="auth = !auth"
    >
      Login
    </v-btn>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { RootState } from '@/store';

@Component({
  name: 'login',
  components: {},
})
export default class Login extends Vue {
  storeRootState: RootState = this.$store.state;

  get auth(): boolean {
    return this.storeRootState.isAuthorized;
  }

  set auth(val: boolean) {
    this.storeRootState.isAuthorized = val;
    this.$router.push('/');
  }
}
</script>
