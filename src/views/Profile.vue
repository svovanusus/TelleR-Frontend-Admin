<template>
  <content-wrapper-with-title title="Profile">
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-card>
            <v-card-title>Avatar</v-card-title>
            <v-card-text>
              <v-responsive aspect-ratio="1/1">
                <v-img
                  :src="avatar"
                />
              </v-responsive>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-dialog max-width="350" v-model="avatarDialog">
                <template #activator="{ on }">
                  <v-btn dark block elevation="0" color="accent" class="mt-n4" v-on="on">
                    Change
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>Avatar upload</v-card-title>
                  <v-card-text>
                    <v-file-input
                      :rules="rules"
                      v-model="selectedAvatar"
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Pick an avatar"
                      prepend-icon="mdi-camera"
                      label="Avatar"
                    ></v-file-input>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="error"
                      :disabled="isAvatarUploading"
                      @click.prevent.stop="avatarDialogClose"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="success"
                      :loading="isAvatarUploading"
                      @click.prevent.stop="avatarDialogUpload"
                    >
                      Upload
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card>
            <v-card-title>
              Profile info
              <v-spacer></v-spacer>
              <v-btn icon @click.prevent.stop="isInfoFormOpened = !isInfoFormOpened">
                <v-icon>{{ isInfoFormOpened ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-title>
            <v-expand-transition>
              <div v-show="isInfoFormOpened">
                <v-card-text>
                  <v-form ref="infoForm" v-model="isInfoFormValid" @submit="onSubmitInfoForm">
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
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    elevation="0"
                    dark
                    color="success"
                    :loading="isInfoSaving"
                    @click.prevent.stop="onSubmitInfoForm"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </div>
            </v-expand-transition>
          </v-card>
          <v-card class="mt-6">
            <v-card-title>
              Change password
              <v-spacer></v-spacer>
              <v-btn icon @click.prevent.stop="isPasswordFormOpened = !isPasswordFormOpened">
                <v-icon>{{ isPasswordFormOpened ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-title>
            <v-expand-transition>
              <div v-show="isPasswordFormOpened">
                <v-card-text>
                  <v-form
                    ref="passwordForm"
                    v-model="isPasswordFormValid"
                    @submit="onSubmitPasswordForm"
                  >
                    <v-text-field
                      type="password"
                      label="Old password"
                      :counter="oldPassword.maxLength"
                      :rules="oldPassword.validationRules"
                      v-model="oldPassword.value"
                    ></v-text-field>
                    <v-text-field
                      type="password"
                      label="New password"
                      :counter="newPassword.maxLength"
                      :rules="newPassword.validationRules"
                      v-model="newPassword.value"
                    ></v-text-field>
                    <v-text-field
                      type="password"
                      label="Password confirmation"
                      :counter="passwordConfirm.maxLength"
                      :rules="passwordConfirm.validationRules"
                      v-model="passwordConfirm.value"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    elevation="0"
                    type="submit"
                    dark
                    color="success"
                    :loading="isPasswordSaving"
                    @click.prevent.stop="onSubmitPasswordForm"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </content-wrapper-with-title>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';
import { RootState, Modules as StoreModules } from '@/store/root-types';
import { State as AuthStoreState, Types as AuthStoreTypes } from '@/store/modules/auth';
import { State as UserStoreState, Types as UserStoreTypes } from '@/store/modules/user';
import UpdateUserInfoRequestDto from '@/entities/dto/request/update-user-info-request-dto';
import UpdatePasswordRequestDto from '@/entities/dto/request/update-password-request-dto';
import UserService from '@/services/api/user-service';
import Config from '@/config';

interface FormField<T> {
  maxLength: number,
  validationRules: ((v: T) => (boolean | string))[],
  value: T,
}

@Component({
  name: 'profile-view',
  components: {
    ContentWrapperWithTitle: () => import('@/components/ContentWrapperWithTitle.vue'),
    PageButtonsSectionWrapper: () => import('@/components/PageButtonsSectionWrapper.vue'),
  },
})
export default class ProfileView extends Vue {
  @Ref('infoForm') readonly infoForm!: any;

  @Ref('passwordForm') readonly passwordForm!: any;

  userStoreState: UserStoreState = this.$store.state[StoreModules.user];

  avatarDialog: boolean = false;

  isAvatarUploading: boolean = false;

  isInfoFormOpened: boolean = true;

  isPasswordFormOpened: boolean = false;

  isInfoSaving: boolean = false;

  isPasswordSaving: boolean = false;

  isInfoFormValid: boolean = true;

  isPasswordFormValid: boolean = true;

  selectedAvatar: any = null;

  rules = [
    (v: any) => (!v || v.size < 2000000 || 'Avatar size should be less than 2 MB!'),
  ];

  username: FormField<string> = {
    maxLength: 30,
    validationRules: [
      v => v.length >= 5 || 'Min length is 5',
      v => /^[a-z]([a-z]|[0-9]|_|-)*$/gm.test(v) || 'Incorrect format',
    ],
    value: '',
  }

  oldPassword: FormField<string> = {
    maxLength: 30,
    validationRules: [],
    value: '',
  }

  newPassword: FormField<string> = {
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
      v => v === this.newPassword.value || 'The passwords doesn\'t match.',
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

  get avatar(): string {
    return this.userStoreState.avatar && this.userStoreState.avatar.length ? this.userStoreState.avatar : `${Config.BASE_FILE_STORAGE_URL}/img/user-avatar.png`;
  }

  avatarDialogClose() {
    this.selectedAvatar = null;
    this.avatarDialog = false;
    this.isAvatarUploading = false;
  }

  avatarDialogUpload() {
    if (this.selectedAvatar) {
      this.isAvatarUploading = true;
      UserService.uploadAvatar(this.selectedAvatar).then((response) => {
        if (response && response.data) {
          this.$store.commit(`${StoreModules.user}/${UserStoreTypes.mutations.SET_AVATAR}`, response.data.filePath);
        }
        this.avatarDialogClose();
      }).catch((data) => {
        this.avatarDialogClose();
      });
    }
  }

  onSubmitInfoForm() {
    this.infoForm.validate();
    if (this.isInfoFormValid) {
      this.isInfoSaving = true;

      const model: UpdateUserInfoRequestDto = {
        username: this.username.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
      };

      UserService.updateUserInfo({
        username: this.username.value,
        email: this.email.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
      }).then((response) => {
        if (response && response.data && response.data.status) {
          this.$notify.success('New data successfully saved.');
        } else {
          this.$notify.error(response.data.messages.join('<br>'));
        }
        this.isInfoSaving = false;
      }).catch((data) => {
        this.$notify.error(data.messages.join('<br>'));
        this.isInfoSaving = false;
      });
    }
  }

  onSubmitPasswordForm() {
    this.passwordForm.validate();
    if (this.isPasswordFormValid) {
      this.isPasswordSaving = true;

      const model: UpdatePasswordRequestDto = {
        oldPassword: this.oldPassword.value,
        newPassword: this.newPassword.value,
        passwordConfirm: this.passwordConfirm.value,
      };

      UserService.changeUserPassword({
        oldPassword: this.oldPassword.value,
        newPassword: this.newPassword.value,
        passwordConfirm: this.passwordConfirm.value,
      }).then((response) => {
        if (response && response.data && response.data.status) {
          this.$notify.success('New password successfully saved.');
        } else {
          this.$notify.error(response.data.messages.join('<br>'));
        }
        this.isPasswordSaving = false;
      }).catch((data) => {
        this.$notify.error(data.messages.join('<br>'));
        this.isPasswordSaving = false;
      });
    }
  }

  mounted() {
    UserService.getUserInfoForEdit().then((response) => {
      if (response && response.data) {
        this.username.value = response.data.username;
        this.email.value = response.data.email;
        this.firstName.value = response.data.firstName;
        this.lastName.value = response.data.lastName;
      } else this.$notify.error('Failed to get data.');
    }).catch(() => this.$notify.error('Failed to get data.'));
  }
}
</script>
