<template>
  <content-wrapper-with-title title="Posts">
    <search-box v-model="search">
      <v-btn elevation="0" dark color="success" class="ml-4" link :to="`/${bid}/post/create`">
        <v-icon left>mdi-plus</v-icon>
        Create
      </v-btn>
    </search-box>

    <v-sheet tile>
      <v-data-table
        :headers="!isLoading ? headers : undefined"
        :loading="isLoading"
        loading-text="Loading... Please wait."
        :items="!isLoading ? posts : undefined"
        :search="search"
      >
        <template #item.title="{ item }">
          <router-link
            :to="`/${bid}/post/${item.pid}`"
          >
            {{ item.title }}
          </router-link>
        </template>

        <template #item.publishDate="{ item }">
          {{ item.publishDate.toLocaleDateString() }}
        </template>
      </v-data-table>
    </v-sheet>
  </content-wrapper-with-title>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Modules as StoreModules, RootState } from '@/store/root-types';
import { State as PostsModuleState, Types as PostsStoreTypes, PostListItem } from '@/store/modules/posts';

@Component({
  name: 'posts-view',
  components: {
    ContentWrapperWithTitle: () => import('@/components/ContentWrapperWithTitle.vue'),
    SearchBox: () => import('@/components/SearchBox.vue'),
  },
})
export default class PostsView extends Vue {
  @Prop({ default: '' }) readonly bid!: string;

  rootStoreModule: RootState = this.$store.state;

  postsStoreModule: PostsModuleState = this.$store.state[StoreModules.posts];

  isLoading: boolean = true;

  search: string = '';

  headers = [
    {
      text: 'Title',
      filterable: true,
      align: 'start',
      value: 'title',
    },
    {
      text: 'Author',
      filterable: false,
      align: 'start',
      value: 'author',
    },
    {
      text: 'Comments',
      filterable: false,
      align: 'center',
      value: 'comments',
    },
    {
      text: 'Created',
      filterable: false,
      align: 'center',
      value: 'publishDate',
    },
  ];

  get posts(): PostListItem[] {
    return this.postsStoreModule.postList;
  }

  mounted() {
    this.$store.dispatch(`${StoreModules.posts}/${PostsStoreTypes.actions.GET_POSTS}`, this.rootStoreModule.currentBlogId)
      .then(() => {
        this.isLoading = false;
      });
  }
}
</script>
