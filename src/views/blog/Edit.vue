<template>
  <content-wrapper-with-title :title="pageTitle">
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
  </content-wrapper-with-title>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Ref,
} from 'vue-property-decorator';
import { Modules as StoreModules } from '@/store/root-types';
import { BlogListItem, State as BlogModuleState, Types as BlogModuleTypes } from '@/store/modules/blogs';
import CreateBlogRequestDto from '@/entities/dto/request/create-blog-request-dto';

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
  @Prop() readonly bid?: number;

  @Ref('editForm') readonly form!: any;

  get pageTitle() {
    return this.bid ? 'Edit blog info' : 'Create New Blog';
  }

  blogsStoreModule: BlogModuleState = this.$store.state[StoreModules.blogs];

  isValid: boolean = true;

  title: FormField<string | undefined> = {
    maxLength: 30,
    validationRules: [
      v => (v || '').trim().length > 0 || 'empty',
      v => (v || '').length <= this.title.maxLength || `a ${1}`,
    ],
    value: '',
  };

  description: FormField<string | undefined> = {
    maxLength: 500,
    validationRules: [
      v => (v || '').trim().length > 0 || 'empty',
      v => (v || '').length <= this.description.maxLength || `a ${2}`,
    ],
    value: '',
  };

  onSend(e: Event) {
    this.form.validate();
    if (!this.isValid) return false;

    const newBlog: CreateBlogRequestDto = {
      title: this.title.value || '',
      description: this.description.value || '',
    };

    this.$store.dispatch(`${StoreModules.blogs}/${BlogModuleTypes.actions.ADD_BLOG}`, newBlog);
    return true;
  }
}
</script>
