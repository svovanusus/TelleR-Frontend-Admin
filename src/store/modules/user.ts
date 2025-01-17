import { Module } from 'vuex';

import { RootState } from '@/store/root-types';
import UserRole from '@/entities/enums/user-role';
import UserService from '@/services/api/user-service';

export interface State {
  userId: number,
  role: UserRole,
  avatar: string,
  fullName: string,
}

export const Types = {
  getters: {},
  mutations: {
    SET_USER_INFO: 'SET_USER_INFO',
    CLEAR_USER_INFO: 'CLEAR_USER_INFO',
    SET_AVATAR: 'SET_AVATAR',
  },
  actions: {
    GET_USER_INFO: 'GET_USER_INFO',
  },
};

const module: Module<State, RootState> = {
  namespaced: true,
  state: {
    userId: 0,
    role: UserRole.Guest,
    avatar: '',
    fullName: 'Guset',
  },
  getters: {},
  mutations: {
    [Types.mutations.SET_USER_INFO]: (state, data: State) => {
      state.userId = data.userId;
      state.role = data.role;
      state.avatar = data.avatar;
      state.fullName = data.fullName;
    },
    [Types.mutations.CLEAR_USER_INFO]: (state) => {
      state.userId = 0;
      state.role = UserRole.Guest;
      state.avatar = '';
      state.fullName = 'Guest';
    },
    [Types.mutations.SET_AVATAR]: (state, avatar?: string) => {
      state.avatar = avatar !== undefined ? avatar : '';
    },
  },
  actions: {
    [Types.actions.GET_USER_INFO]: async (context) => {
      const response = await UserService.getUserInfo();

      if (response && response.data) {
        const newState: State = {
          userId: response.data.userId,
          role: response.data.role,
          avatar: response.data.avatar !== undefined ? response.data.avatar : '',
          fullName: response.data.fullName,
        };

        context.commit(Types.mutations.SET_USER_INFO, newState);
      }
    },
  },
};

export default module;
