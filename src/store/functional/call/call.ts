import CallState from '@/store/functional/call/types';
import Call from '@/domain/entities/functional/Call';
import {ActionTree, Module} from 'vuex';
import RootState from '@/store/types';
import axios from 'axios';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';

export const state: CallState = {
    call: new Call('', '', '', '', '', '', 0, 0, ''),
    calls: [],
    crmToken: '',
    crmAddress: 'https://dummy_address/',
};

export const actions: ActionTree<CallState, RootState> = {
    async getCalls() {
      try {
          const res = await axios.post(`${state.crmAddress}`, {
              cmd: 'history',
              period: 'today',
              token: state.crmToken,
          });

          state.calls = res.data;
      } catch {
          ErrorNotifier.notify();
      }
    },
};

export const call: Module<CallState, RootState> = {
    state, actions,
};

