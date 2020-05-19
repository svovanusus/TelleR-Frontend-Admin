<template>
  <content-wrapper-with-title title="Post Editor">
    <v-form
      v-model="isValid"
      ref="editForm"
      @submit.prevent.stop="onSend"
    >
      <v-text-field
        v-model="title.value"
        :counter="title.maxLength"
        :rules="title.validationRules"
        label="Title"
      ></v-text-field>

      <text-editor v-model="htmlContent" class="mt-4" />

      <page-buttons-section-wrapper>
        <template #left>
          <v-btn dark color="accent">
            Publish/Unpublish
          </v-btn>
        </template>
        <template #default>
          <v-btn dark color="error" link to="/">
            Cancel
          </v-btn>
          <v-btn type="submit" dark color="success">
            Save
          </v-btn>
        </template>
      </page-buttons-section-wrapper>
    </v-form>
  </content-wrapper-with-title>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';

import { Modules as StoreModules, RootState } from '@/store/root-types';
import { PostListItem, State as PostModuleState, Types as PostModuleTypes } from '@/store/modules/posts';
import CreatePostRequestDto from '../../entities/dto/request/create-post-request-dto';

interface FormField<T> {
  maxLength: number,
  validationRules: ((v: T) => (boolean | string))[],
  value: T,
}

@Component({
  name: 'post-editor',
  components: {
    ContentWrapperWithTitle: () => import('@/components/ContentWrapperWithTitle.vue'),
    PageButtonsSectionWrapper: () => import('@/components/PageButtonsSectionWrapper.vue'),
    TextEditor: () => import('@/components/TextEditor.vue'),
  },
})
export default class PostEditor extends Vue {
  @Ref('editForm') readonly form!: any;

  rootStoreState: RootState = this.$store.state;

  postsStoreModule: PostModuleState = this.$store.state[StoreModules.posts];

  isValid: boolean = true;

  title: FormField<string | undefined> = {
    maxLength: 30,
    validationRules: [
      v => (v || '').trim().length > 0 || 'empty',
      v => (v || '').length <= this.title.maxLength || `a ${1}`,
    ],
    value: '',
  };

  htmlContent: string = '';

  onSend(e: Event) {
    this.form.validate();
    if (!this.isValid) {
      this.$notify.error('Not valid');
      return false;
    }

    const newPost: CreatePostRequestDto = {
      blogId: this.rootStoreState.currentBlogId || 0,
      title: this.title.value || '',
      content: this.htmlContent,
      isPublished: false,
    };

    this.$store.dispatch(`${StoreModules.posts}/${PostModuleTypes.actions.ADD_POST}`, newPost)
      .then(() => this.$notify.success('SUCCESS'))
      .catch(() => this.$notify.error('ERROR'));

    return true;
  }
}
</script>
