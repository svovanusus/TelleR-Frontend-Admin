<template>
  <v-card v-if="isShowReceiverNotifications || isShowSenderNotifications">
    <v-card-title>
      Invite Notifications
      <v-spacer></v-spacer>
      <v-btn icon @click="isOpened = !isOpened">
        <v-icon>{{ isOpened ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-expand-transition>
      <v-card-text v-show="isOpened">
        <author-invite-notifications-for-sender v-if="isShowSenderNotifications" />
        <author-invite-notifications-for-receiver v-if="isShowReceiverNotifications" />
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Modules as StoreModules } from '@/store/root-types';
import { State as AuthorInvitesStoreState, Types as AuthorInvitesStoreTypes } from '@/store/modules/author-invites';

@Component({
  name: 'author-invite-notifications',
  components: {
    AuthorInviteNotificationsForSender: () => import('@/components/AuthorInviteNotificationsForSender.vue'),
    AuthorInviteNotificationsForReceiver: () => import('@/components/AuthorInviteNotificationsForReceiver.vue'),
  },
})
export default class AuthorInviteNotifications extends Vue {
  authorInvitesStoreState: AuthorInvitesStoreState = this.$store.state[StoreModules.authorInvites];

  isOpened: boolean = true;

  get isShowReceiverNotifications(): boolean {
    return this.authorInvitesStoreState.asReceiverNotifications.length > 0;
  }

  get isShowSenderNotifications(): boolean {
    return this.authorInvitesStoreState.asSenderNotifications.length > 0;
  }

  mounted() {
    this.$store.dispatch(`${StoreModules.authorInvites}/${AuthorInvitesStoreTypes.actions.GET_NOTIFICATIONS}`);
  }
}
</script>
