<template>
  <v-container fluid>
    <v-row
      v-for="(notification, index) in notifications"
      :key="`invite-notification-${notification.invited}`"
      :style="`${index === 0 ? 'border-top: 1px solid #777; ' : ''}border-bottom: 1px solid #777;`"
    >
      <v-col>
        <h3 class="notification-title">
          The user <b>{{ notification.sender.fullName }}</b>
          invite you to blog <b>{{ notification.blogName }}</b>.
        </h3>
      </v-col>
      <v-col class="text-end">
        <v-btn
          elevation="0"
          dark
          color="error"
          @click.prevent.stop="answer(notification.inviteId, false)"
        >
          Decline
        </v-btn>
        <v-btn
          elevation="0"
          dark
          color="success"
          class="ml-2"
          @click.prevent.stop="answer(notification.inviteId, true)"
        >
          Approve
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
import { Types as BlogsStoreTypes } from '@/store/modules/blogs';

@Component({
  name: 'author-invite-notifications-for-receiver',
})
export default class AuthorInviteNotificationsForReceiver extends Vue {
  authorInvitesStoreState: AuthorInvitesStoreState = this.$store.state[StoreModeules.authorInvites];

  get notifications() {
    return this.authorInvitesStoreState.asReceiverNotifications;
  }

  answer(inviteId: number, isApprove: boolean) {
    this.$store.dispatch(`${StoreModeules.authorInvites}/${AuthorInvitesStoreTypes.actions.ANSWER_TO_NOTIFICATION}`, {
      inviteId,
      isApprove,
      onSuccess: () => {
        if (isApprove) this.$store.dispatch(`${StoreModeules.blogs}/${BlogsStoreTypes.actions.GET_BLOGS}`);
      },
      onError: () => this.$notify.error('Invite wasn\'t be saved.'),
    });
  }
}
</script>
