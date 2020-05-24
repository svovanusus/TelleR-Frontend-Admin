<template>
  <div
    class="mt-12"
  >
    <v-form
      ref="signupForm"
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
        Sign-up
      </v-card-title>
      <v-card-text class="pt-2">
        <v-text-field
          type="text"
          label="E-Mail"
          :counter="email.maxLength"
          :rules="email.validationRules"
          v-model="email.value"
        ></v-text-field>
        <v-text-field
          type="text"
          label="Username"
          :counter="username.maxLength"
          :rules="username.validationRules"
          v-model="username.value"
        ></v-text-field>
        <v-text-field
          type="password"
          label="Password"
          :counter="password.maxLength"
          :rules="password.validationRules"
          v-model="password.value"
        ></v-text-field>
        <v-text-field
          type="password"
          label="Password confirmation"
          :counter="passwordConfirm.maxLength"
          :rules="passwordConfirm.validationRules"
          v-model="passwordConfirm.value"
        ></v-text-field>
        <v-text-field
          type="text"
          label="First name"
          :counter="firstName.maxLength"
          :rules="firstName.validationRules"
          v-model="firstName.value"
        ></v-text-field>
        <v-text-field
          type="text"
          label="Last name"
          :counter="lastName.maxLength"
          :rules="lastName.validationRules"
          v-model="lastName.value"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="error" to="login" :disabled="isSending">
          Sign-in
        </v-btn>
        <v-btn dark depressed color="success" type="submit" :loading="isSending">
          Sign-up
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
import SignupRequestDto from '@/entities/dto/request/signup-request-dto';

interface FormField<T> {
  maxLength: number,
  validationRules: ((v: T) => (boolean | string))[],
  value: T,
}

@Component({
  name: 'login-view',
  components: {},
})
export default class SignupView extends Vue {
  @Ref('signupForm') readonly signupForm!: any;

  isSending: boolean = false;

  isFormValid: boolean = true;

  username: FormField<string> = {
    maxLength: 30,
    validationRules: [
      v => v.length >= 5 || 'Min length is 5',
      v => /^[a-z]([a-z]|[0-9]|_|-)*$/gm.test(v) || 'Incorrect format',
    ],
    value: '',
  }

  password: FormField<string> = {
    maxLength: 30,
    validationRules: [
      v => v.length >= 6 || 'Min length is 6',
      v => /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!?,._-]).{6,30})/gm.test(v) || 'Incorrect format',
    ],
    value: '',
  }

  passwordConfirm: FormField<string> = {
    maxLength: 30,
    validationRules: [
      v => v === this.password.value || 'The passwords doesn\'t match.',
    ],
    value: '',
  }

  email: FormField<string> = {
    maxLength: 120,
    validationRules: [
      v => /.+@.+\..+/gm.test(v) || 'Email format is incorrect',
    ],
    value: '',
  }

  firstName: FormField<string> = {
    maxLength: 30,
    validationRules: [],
    value: '',
  }

  lastName: FormField<string> = {
    maxLength: 30,
    validationRules: [],
    value: '',
  }

  onSubmit() {
    this.signupForm.validate();
    if (this.isFormValid) {
      this.isSending = true;

      const model: SignupRequestDto = {
        username: this.username.value,
        password: this.password.value,
        passwordConfirm: this.passwordConfirm.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
      };

      this.$store.dispatch(`${StoreModules.auth}/${AuthStoreTypes.actions.SIGNUP}`, {
        data: model,
        onSuccess: () => {
          this.$notify.success('You are successfully signing up.');
          this.$store.dispatch(`${StoreModules.auth}/${AuthStoreTypes.actions.LOGIN}`, {
            login: model.username,
            password: model.password,
            onSuccess: (msg: string) => {
              this.$notify.success(msg);
              this.$router.push('/');
              this.isSending = false;
            },
            onError: (msg: string) => {
              this.$notify.error(msg);
              this.isSending = false;
            },
          });
        },
        onError: (errs: string[]) => {
          this.$notify.error(errs.join('<br>'));
          this.isSending = false;
        },
      });
    }
  }
}
</script>
