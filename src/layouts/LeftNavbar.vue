<template>
  <v-navigation-drawer
    app
    clipped
    v-model="isShown"
    :mini-variant="isMini"
    :expand-on-hover="isMini"
    mobile-break-point = "960"
    v-resize="resizing"
  >
    <v-list class="py-0">
      <v-list-item-group color="secondary">
        <v-list-item
          v-for="item in commonSectionItems"
          :key="'common-nav-' + item.title"
          link
          :to="item.url"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <template v-if="isShowBlogSection">
      <v-divider></v-divider>
      <v-list subheader>
        <v-list-item-group color="secondary">
          <v-list-item
            v-for="item in blogSectionItems"
            :key="'blog-nav-' + item.title"
            link
            :to="item.url"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { RootState } from '@/store/root-types';

import NavigationItem from '@/entities/NavigationItem';

@Component({
  name: 'left-navbar',
  components: {},
})
export default class LeftNavbar extends Vue {
  window: any = window;

  storeRootState: RootState = this.$store.state;

  isMini: boolean = this.window.innerWidth >= 960 && this.window.innerWidth < 1264;

  commonSectionItems: NavigationItem[] = [
    {
      title: 'My blogs',
      icon: 'mdi-home',
      url: '/',
    },
  ];

  get isCurrentBlogAvailableToEdit(): boolean {
    return this.storeRootState.currentBlogAvailableToEdit;
  }

  get blogSectionItems(): NavigationItem[] {
    return this.isCurrentBlogAvailableToEdit ? [
      {
        title: 'Posts',
        icon: 'mdi-newspaper-variant-multiple',
        url: `/${this.currentBlogId}/posts`,
      },
      {
        title: 'Authors',
        icon: 'mdi-account-group',
        url: `/${this.currentBlogId}/authors`,
      },
      {
        title: 'Blog info',
        icon: 'mdi-information-variant',
        url: `/${this.currentBlogId}/info`,
      },
    ] : [
      {
        title: 'Posts',
        icon: 'mdi-newspaper-variant-multiple',
        url: `/${this.currentBlogId}/posts`,
      },
    ];
  }

  get isShowBlogSection():boolean {
    return !!this.storeRootState.currentBlogId;
  }

  get currentBlogId(): number | undefined {
    return this.storeRootState.currentBlogId;
  }

  get isShown():boolean | null {
    return this.storeRootState.isLeftNavbarOpen;
  }

  set isShown(val: boolean | null) {
    this.storeRootState.isLeftNavbarOpen = val;
  }

  resizing() {
    this.isMini = this.window.innerWidth >= 960 && this.window.innerWidth < 1264;
  }
}
</script>
