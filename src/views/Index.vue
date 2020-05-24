<template>
  <content-wrapper-with-title title="My Blogs">
    <author-invite-notifications class="my-4" />

    <search-box v-model="search">
      <v-btn elevation="0" dark color="success" class="ml-4" link to="/blogs/create">
        <v-icon left>mdi-plus</v-icon>
        Create
      </v-btn>
    </search-box>

    <v-sheet tile>
      <v-data-table
        :headers="!isLoading ? headers : undefined"
        :loading="isLoading"
        loading-text="Loading... Please wait."
        :items="!isLoading ? blogs : undefined"
        :search="search"
      >
        <template #item.title="{ item }">
          <router-link
            :to="`/${item.bid}/posts`"
          >
            {{ item.title }}
          </router-link>
        </template>
      </v-data-table>
    </v-sheet>
  </content-wrapper-with-title>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Modules as StoreModules } from '@/store/root-types';
import { BlogListItem, State as BlogsModuleState, Types as BlogsStoreTypes } from '@/store/modules/blogs';

@Component({
  name: 'index-view',
  components: {
    ContentWrapperWithTitle: () => import('@/components/ContentWrapperWithTitle.vue'),
    SearchBox: () => import('@/components/SearchBox.vue'),
    AuthorInviteNotifications: () => import('@/components/AuthorInviteNotifications.vue'),
  },
})
export default class IndexView extends Vue {
  blogsStoreModule: BlogsModuleState = this.$store.state[StoreModules.blogs];

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
      text: 'Owner',
      filterable: false,
      align: 'start',
      value: 'owner',
    },
    {
      text: 'Authors',
      filterable: false,
      align: 'center',
      value: 'authors',
    },
    {
      text: 'Posts',
      filterable: false,
      align: 'center',
      value: 'posts',
    },
  ];

  get blogs(): BlogListItem[] {
    return this.blogsStoreModule.blogList;
  }

  beforeMount() {
    this.$store.dispatch(`${StoreModules.blogs}/${BlogsStoreTypes.actions.GET_BLOGS}`)
      .then(() => {
        this.isLoading = false;
      });
  }
}
</script>
