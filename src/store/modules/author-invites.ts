import { Module } from 'vuex';
import { RootState } from '@/store/root-types';

import {
  AuthorInviteForReceiverResponseDto,
  AuthorInviteNotificationForSenderResponseDto,
} from '@/entities/dto/response/author-invite-notifications-response-dto';
import AuthorInviteService from '@/services/api/author-invite-service';

export interface State {
  asReceiverNotifications: AuthorInviteForReceiverResponseDto[],
  asSenderNotifications: AuthorInviteNotificationForSenderResponseDto[],
}

export const Types = {
  getters: {},
  mutations: {
    SET_AS_RECEIVER_NOTIFICATIONS: 'SET_AS_RECEIVER_NOTIFICATIONS',
    SET_AS_SENDER_NOTIFICATIONS: 'SET_AS_SENDER_NOTIFICATIONS',
  },
  actions: {
    GET_NOTIFICATIONS: 'GET_NOTIFICATIONS',
    ANSWER_TO_NOTIFICATION: 'ANSWER_TO_NOTIFICATION',
    CLOSE_NOTIFICATION: 'CLOSE_NOTIFICATION',
  },
};

const module: Module<State, RootState> = {
  namespaced: true,
  state: {
    asReceiverNotifications: [],
    asSenderNotifications: [],
  },
  getters: {},
  mutations: {
    [Types.mutations.SET_AS_RECEIVER_NOTIFICATIONS]: (
      state,
      notifications: AuthorInviteForReceiverResponseDto[],
    ) => {
      state.asReceiverNotifications = notifications;
    },

    [Types.mutations.SET_AS_SENDER_NOTIFICATIONS]: (
      state,
      notifications: AuthorInviteNotificationForSenderResponseDto[],
    ) => {
      state.asSenderNotifications = notifications;
    },
  },
  actions: {
    [Types.actions.GET_NOTIFICATIONS]: async (context) => {
      const response = await AuthorInviteService.getInviteNotifications();

      if (response && response.data) {
        context.commit(Types.mutations.SET_AS_RECEIVER_NOTIFICATIONS, response.data.asReceiver);
        context.commit(Types.mutations.SET_AS_SENDER_NOTIFICATIONS, response.data.asSender);
      }
    },

    [Types.actions.ANSWER_TO_NOTIFICATION]: async (context, data: {
      inviteId: number,
      isApprove: boolean,
      onSuccess: () => void,
      onError: () => void,
    }) => {
      const response = await AuthorInviteService.answerInvite(data.inviteId, data.isApprove);

      if (response && response.data) {
        context.dispatch(Types.actions.GET_NOTIFICATIONS);
        if (typeof data.onSuccess !== 'undefined') data.onSuccess();
      } else if (typeof data.onError !== 'undefined') data.onError();
    },

    [Types.actions.CLOSE_NOTIFICATION]: async (context, data: {
      inviteId: number,
      onSuccess: () => void,
      onError: () => void,
    }) => {
      const response = await AuthorInviteService.closeInvite(data.inviteId);

      if (response && response.data) {
        context.dispatch(Types.actions.GET_NOTIFICATIONS);
        if (typeof data.onSuccess !== 'undefined') data.onSuccess();
      } else if (typeof data.onError !== 'undefined') data.onError();
    },

  },
};

export default module;
