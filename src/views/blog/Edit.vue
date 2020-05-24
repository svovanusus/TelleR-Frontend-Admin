<template>
  <content-wrapper-with-title :title="pageTitle">
    <v-form
      v-if="isBlogAvailableToEdit"
      v-model="isValid"
      ref="editForm"
      @submit.prevent.stop="onSend"
    >
      <v-text-field
        v-model="name.value"
        :counter="name.maxLength"
        :rules="name.validationRules"
        label="Name"
      ></v-text-field>
      <v-text-field
        v-model="title.value"
        :counter="title.maxLength"
        :rules="title.validationRules"
        label="Title"
      ></v-text-field>
      <v-textarea
        v-model="description.value"
        :counter="description.maxLength"
        :rules="description.rules"
        label="Description"
      ></v-textarea>
      <page-buttons-section-wrapper>
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
    <p v-else>This page is not availeble for you.</p>
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
import { BlogListItem, State as BlogModuleState, Types as BlogModuleTypes } from '@/store/modules/blogs';
import CreateBlogRequestDto from '@/entities/dto/request/create-blog-request-dto';
import BlogService from '../../services/api/blog-service';

interface FormField<T> {
  maxLength: number,
  validationRules: ((v: T) => (boolean | string))[],
  value: T,
}


@Component({
  name: 'blog-editor',
  components: {
    ContentWrapperWithTitle: () => import('@/components/ContentWrapperWithTitle.vue'),
    PageButtonsSectionWrapper: () => import('@/components/PageButtonsSectionWrapper.vue'),
  },
})
export default class BlogEditor extends Vue {
  @Prop() readonly bid?: string;

  @Ref('editForm') readonly form!: any;

  get pageTitle() {
    return this.bid ? 'Edit blog info' : 'Create New Blog';
  }

  rootState: RootState = this.$store.state;

  blogsStoreModule: BlogModuleState = this.$store.state[StoreModules.blogs];

  isValid: boolean = true;

  name: FormField<string | undefined> = {
    maxLength: 20,
    validationRules: [
      v => (v || '').trim().length > 0 || 'empty',
      v => /^[a-z][a-z0-9-_]*$/gm.test(v || '') || 'Invalid name format',
      v => (v || '').length <= this.name.maxLength || `Name length should be max of ${this.name.maxLength}`,
    ],
    value: '',
  }

  title: FormField<string | undefined> = {
    maxLength: 60,
    validationRules: [
      v => (v || '').trim().length > 0 || 'empty',
      v => (v || '').length <= this.title.maxLength || `Title length should be max of ${this.title.maxLength}`,
    ],
    value: '',
  };

  description: FormField<string | undefined> = {
    maxLength: 5000,
    validationRules: [
      v => (v || '').trim().length > 0 || 'empty',
      v => (v || '').length <= this.description.maxLength || `Description length should be max of ${this.description.maxLength}`,
    ],
    value: '',
  };

  get isBlogAvailableToEdit():boolean {
    return !this.rootState.currentBlogId || this.rootState.currentBlogAvailableToEdit;
  }

  onSend(e: Event) {
    this.form.validate();
    if (!this.isValid) return false;

    const newBlog: CreateBlogRequestDto = {
      name: this.name.value || '',
      title: this.title.value || '',
      description: this.description.value || '',
    };

    if (this.bid) {
      BlogService.update({
        blogId: Number(this.bid),
        name: this.name.value || '',
        title: this.title.value || '',
        description: this.description.value || '',
      }).then((response) => {
        if (response && response.data) {
          if (response.data.isError) this.$notify.error(response.data.messages.join('<br>'));
          else this.$notify.success('Blog info successfully updated.');
        } else this.$notify.error('Unknown error.');
      }).catch(() => {
        this.$notify.error('Unknown error.');
      });
    } else {
      this.$store.dispatch(`${StoreModules.blogs}/${BlogModuleTypes.actions.ADD_BLOG}`, {
        blog: newBlog,
        onSuccess: (msg: string) => {
          this.$notify.success(msg);
          this.$router.push('/');
        },
        onError: this.$notify.error,
      });
    }
    return true;
  }

  mounted() {
    if (this.bid) {
      BlogService.getBlogInfo(Number(this.bid))
        .then((response) => {
          if (response && response.data) {
            this.name.value = response.data.name;
            this.title.value = response.data.title;
            this.description.value = response.data.description;
          }
        });
    }
  }
}
</script>
