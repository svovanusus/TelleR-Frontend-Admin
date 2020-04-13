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
    <v-divider></v-divider>
    <v-list-item class="py-2">
      <v-list-item-title class="title text-center">Selected blog</v-list-item-title>
    </v-list-item>
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
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { RootState } from '@/store';

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

  blogSectionItems: NavigationItem[] = [
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      url: '/:bid/dashboard',
    },
    {
      title: 'Blog info',
      icon: 'mdi-information-variant',
      url: '/:bid/info',
    },
    {
      title: 'Authors',
      icon: 'mdi-account-group',
      url: '/:bid/authors',
    },
    {
      title: 'Posts',
      icon: 'mdi-newspaper-variant-multiple',
      url: '/:bid/posts',
    },
  ];

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
