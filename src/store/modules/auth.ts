import Vue from 'vue';

import { Module } from 'vuex';
import { RootState } from '@/store/root-types';

import AuthService from '@/services/api/auth-service';
import SignupRequestDto from '@/entities/dto/request/signup-request-dto';

export interface SignupModel {
  data: SignupRequestDto,
  onSuccess?: () => void,
  onError?: (errs: string[]) => void,
}

export interface State {
  isAuthorized: boolean,
  token?: string,
}

export const Types = {
  getters: {},
  mutations: {
    SET_AUTHORIZED: 'SET_AUTHORIZED',
    SET_TOKEN: 'SET_TOKEN',
  },
  actions: {
    SAVE_STATE: 'SAVE_STATE',
    LOAD_STATE: 'LOAD_STATE',
    CLEAR_STATE: 'CLEAR_STATE',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SIGNUP: 'SIGNUP',
  },
};

const module: Module<State, RootState> = {
  namespaced: true,
  state: {
    isAuthorized: false,
  },
  getters: {},
  mutations: {
    [Types.mutations.SET_AUTHORIZED]: (state, isAuthorized: boolean) => {
      state.isAuthorized = isAuthorized;
    },
    [Types.mutations.SET_TOKEN]: (state, token?: string) => {
      state.token = token;
    },
  },
  actions: {
    [Types.actions.SAVE_STATE]: (context) => {
      localStorage.removeItem('auth');
      localStorage.setItem('auth', JSON.stringify(context.state));
    },
    [Types.actions.LOAD_STATE]: (context) => {
      const savedState = localStorage.getItem('auth');
      if (savedState !== null) {
        const savedStateObj = JSON.parse(savedState);
        context.commit(Types.mutations.SET_AUTHORIZED, savedStateObj.isAuthorized);
        context.commit(Types.mutations.SET_TOKEN, savedStateObj.token);
      }
    },
    [Types.actions.CLEAR_STATE]: (context) => {
      context.commit(Types.mutations.SET_AUTHORIZED, false);
      context.commit(Types.mutations.SET_TOKEN, undefined);
    },
    [Types.actions.LOGIN]: async (context, data: {
      login: string,
      password: string,
      onSuccess?: (msg: string) => void,
      onError?: (msg: string) => void
    }) => {
      const response = await AuthService.login(data.login, data.password);

      if (response) {
        if (response.status === 200) {
          context.commit(Types.mutations.SET_AUTHORIZED, true);
          context.commit(Types.mutations.SET_TOKEN, response.data.token);
          context.dispatch(Types.actions.SAVE_STATE);
          if (typeof data.onSuccess !== 'undefined') data.onSuccess('Welcome to TelleR-ADMIN');
        } else if (response.status === 401) {
          context.commit(Types.mutations.SET_AUTHORIZED, false);
          if (typeof data.onError !== 'undefined') data.onError('Login or Password is incorrect');
        } else {
          context.commit(Types.mutations.SET_AUTHORIZED, false);
          if (typeof data.onError !== 'undefined') data.onError('Unknown error! Please try latter');
        }
      }
    },
    [Types.actions.LOGOUT]: async (context) => {
      context.dispatch(Types.actions.CLEAR_STATE);
      context.dispatch(Types.actions.SAVE_STATE);
    },
    [Types.actions.SIGNUP]: async (context, options: SignupModel) => {
      const response = await AuthService.signup(options.data);
      if (response) {
        if (response.data.status) {
          if (typeof options.onSuccess !== 'undefined') options.onSuccess();
        } else if (typeof options.onError !== 'undefined') options.onError(response.data.messages);
      }
    },
  },
};

export default module;
