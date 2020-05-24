<template>
  <v-container fluid>
    <v-row
      v-for="(notification, index) in notifications"
      :key="`invite-notification-${notification.invited}`"
      :style="`${index === 0 ? 'border-top: 1px solid #777; ' : ''}border-bottom: 1px solid #777;`"
    >
      <v-col>
        <h3 class="notification-title">
          The user <b>{{ notification.reciever.fullName }}</b>
          was <b>{{ notification.isApproved ? 'Approve' : 'Decline' }}</b>
          your invite to blog <b>{{ notification.blogName }}</b>
        </h3>
      </v-col>
      <v-col cols="1" class="text-end">
        <v-btn icon @click.prevent.stop="close(notification.inviteId)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.notification-title {
  line-height: 36px;
  font-weight: 400;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Modules as StoreModeules } from '@/store/root-types';
import { State as AuthorInvitesStoreState, Types as AuthorInvitesStoreTypes } from '@/store/modules/author-invites';

@Component({
  name: 'author-invite-notifications-for-sender',
})
export default class AuthorInviteNotificationsForSender extends Vue {
  authorInvitesStoreState: AuthorInvitesStoreState = this.$store.state[StoreModeules.authorInvites];

  get notifications() {
    return this.authorInvitesStoreState.asSenderNotifications;
  }

  close(inviteId: number) {
    this.$store.dispatch(`${StoreModeules.authorInvites}/${AuthorInvitesStoreTypes.actions.CLOSE_NOTIFICATION}`, {
      inviteId,
      onError: () => this.$notify.error('Notification wasn\'t be closed.'),
    });
  }
}
</script>
