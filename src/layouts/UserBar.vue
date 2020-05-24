<template>
  <v-menu offset-y>
    <template #activator="{ on }">
      <v-list-item v-on="on" link class="userbar-activator primary darken-1">
        <v-list-item-avatar width="40" height="40" min-width="40" min-height="40">
          <v-avatar width="40" height="40" min-width="40" min-height="40">
            <v-img
              src="@/assets/img/user-avatar.png"
              width="40"
              height="40"
              min-width="40"
              min-height="40"
            />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ fullName }} <v-icon>mdi-menu-down</v-icon></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-list>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="item in userbarNavItems"
          :key="'userbar-nav-' + item.title"
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
  </v-menu>
</template>

<style lang="scss" scoped>
.userbar-activator {
  height: 100%;
  flex-basis: auto;
  flex-grow: unset;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import NavigationItem from '@/entities/NavigationItem';
import { Modules as StoreModules } from '@/store/root-types';
import { State as UserStoreState } from '@/store/modules/user';

@Component({
  name: 'user-bar',
  components: {},
})
export default class UserBar extends Vue {
  userStoreState: UserStoreState = this.$store.state[StoreModules.user];

  userbarNavItems: NavigationItem[] = [
    {
      title: 'Profile',
      icon: 'mdi-account',
      url: '/profile',
    },
    {
      title: 'Logout',
      icon: 'mdi-logout',
      url: '/logout',
    },
  ];

  get fullName(): string {
    return this.userStoreState.fullName;
  }
}
</script>
