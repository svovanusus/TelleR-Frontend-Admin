<template>
  <div
    class="mt-12"
  >
    <v-form
      ref="authForm"
      v-model="isFormValid"
      @submit.prevent.stop="onSubmit"
    >
      <v-card
        color="white"
        max-width="500"
        class="mx-auto"
        style="width: 100%"
      >
      <v-card-title class="headline justify-center primary white--text">
        Sign-in
      </v-card-title>
      <v-card-text class="pt-2">
        <v-text-field
          type="text"
          label="Username"
          counter="15"
          v-model="login"
        ></v-text-field>
        <v-text-field
          type="password"
          label="Password"
          counter="30"
          v-model="password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="error" to="/signup">
          Sign-up
        </v-btn>
        <v-btn dark depressed color="success" type="submit">
          Sign-in
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';
import { Modules as StoreModules } from '@/store/root-types';
import { Types as AuthStoreTypes } from '@/store/modules/auth';

@Component({
  name: 'login-view',
  components: {},
})
export default class LoginView extends Vue {
  @Ref('authForm') readonly authForm!: any;

  isFormValid: boolean = true;

  login: string = '';

  password: string = '';

  onSubmit() {
    this.authForm.validate();
    if (this.isFormValid) {
      this.$store.dispatch(`${StoreModules.auth}/${AuthStoreTypes.actions.LOGIN}`, {
        login: this.login,
        password: this.password,
        onSuccess: (msg: string) => {
          this.$notify.success(msg);
          this.$router.push('/');
        },
        onError: (msg: string) => {
          this.$notify.error(msg);
        },
      });
    }
  }
}
</script>
