<template>
  <content-wrapper-with-title title="Post Editor">
    <v-form
      v-if="isLoaded"
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

      <text-editor v-model="htmlContent" class="mt-4" @loaded="onLoaded" />

      <page-buttons-section-wrapper>
        <template #left>
          <v-btn
            dark
            color="accent"
            v-if="!isPublished"
            :loading="isPublishing"
            @click.prevent.stop="publish"
          >
            Save & Publish
          </v-btn>
          <p v-else>Published: {{ publishDate.toLocaleDateString() }}</p>
        </template>
        <template #default>
          <v-btn dark color="error" link :to="`/${blogId}/posts`">
            Cancel
          </v-btn>
          <v-btn type="submit" dark color="success" :loading="isSaving">
            Save
          </v-btn>
        </template>
      </page-buttons-section-wrapper>
    </v-form>
    <v-overlay :value="!isLoaded || isEditorLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </content-wrapper-with-title>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Ref,
} from 'vue-property-decorator';

import { Modules as StoreModules, RootState } from '@/store/root-types';
import { PostListItem, State as PostModuleState, Types as PostModuleTypes } from '@/store/modules/posts';
import CreatePostRequestDto from '@/entities/dto/request/create-post-request-dto';
import PostService from '@/services/api/post-service';

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
  @Prop() readonly pid?: string;

  @Ref('editForm') readonly form!: any;

  isLoaded: boolean = false;

  isSaving: boolean = false;

  isPublishing: boolean = false;

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

  isPublished: boolean = false;

  isEditorLoading: boolean = true;

  publishDate: Date | null = null;

  get blogId(): number {
    return this.rootStoreState.currentBlogId || 0;
  }

  get postId(): number | undefined {
    if (this.pid) return Number(this.pid);
    return undefined;
  }

  onLoaded() {
    this.isEditorLoading = false;
  }

  onSend(e: Event, callback: (data: any) => void) {
    if (this.isSaving) return false;

    this.isSaving = true;

    this.form.validate();
    if (!this.isValid) {
      this.$notify.error('Not valid');
      this.isSaving = false;
      return false;
    }

    const newPost: CreatePostRequestDto = {
      postId: this.postId,
      blogId: this.blogId,
      title: this.title.value || '',
      content: this.htmlContent,
      isPublished: this.isPublished || false,
    };

    if (this.postId) {
      PostService.update(newPost)
        .then((response) => {
          if (response && response.data) {
            this.$notify.success('The post data successfully updated.');
            if (typeof callback !== 'undefined') callback(response.data);
          } else {
            this.$notify.error('Error occures while saving post data.');
            this.isPublishing = false;
          }
          this.isSaving = false;
        }).catch(() => {
          this.$notify.error('Error occures while saving post data.');
          this.isPublishing = false;
          this.isSaving = false;
        });
    } else {
      this.$store.dispatch(`${StoreModules.posts}/${PostModuleTypes.actions.ADD_POST}`, newPost)
        .then(() => {
          this.$notify.success('SUCCESS');
          this.$router.replace(`/${this.rootStoreState.currentBlogId}/posts`);
          this.isSaving = false;
          this.isPublishing = false;
        })
        .catch(() => {
          this.$notify.error('ERROR');
          this.isSaving = false;
          this.isPublishing = false;
        });
    }

    return true;
  }

  publish(e: Event) {
    if (this.isPublishing) return;

    this.isPublishing = true;

    if (this.postId) {
      this.onSend(e, (data: any) => {
        PostService.publish(this.postId || 0).then((response) => {
          if (response && response.data) {
            this.$notify.success('The post successfully published.');
            this.publishDate = new Date();
            this.isPublished = true;
          } else this.$notify.error('The error occured while post publishing.');
          this.isPublishing = false;
        }).catch(() => {
          this.$notify.error('The error occured while post publishing.');
          this.isPublishing = false;
        });
      });
    } else {
      this.isPublished = true;
      this.onSend(e, (data: any) => {
        this.$notify.success('The post successfully published.');
        this.publishDate = new Date();
        this.isPublishing = false;
        this.isPublished = true;
      });
    }
  }

  mounted() {
    if (this.postId) {
      PostService.getForEdit(this.postId).then((response) => {
        if (response && response.data) {
          this.title.value = response.data.title;
          this.htmlContent = response.data.postContent;
          this.isPublished = response.data.isPublished;
          this.publishDate = new Date(response.data.publishedDate);
        } else this.$notify.error('Failed to get post data.');
        this.isLoaded = true;
      }).catch(() => {
        this.$notify.error('Failed to get post date.');
        this.isLoaded = true;
      });
    } else this.isLoaded = true;
  }
}
</script>
