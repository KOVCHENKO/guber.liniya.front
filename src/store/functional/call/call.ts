import CallState from '@/store/functional/call/types';
import Call from '@/domain/entities/functional/Call';
import {ActionTree, Module} from 'vuex';
import RootState from '@/store/types';
import {crmAddress, crmToken} from '@/globals';
import axios from 'axios';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';

export const state: CallState = {
    call: new Call('', '', '', '', '', '', 0, 0, ''),
    calls: [],
    crmToken: '81552f04-5695-463-857d-15bf8d3c6239',
    rawCalls: [{}],
};

export const actions: ActionTree<CallState, RootState> = {
    async getCalls() {
      try {
          const res = await axios.post(`${crmAddress}`, {
              cmd: 'history',
              period: 'today',
              token: crmToken,
          });

          state.rawCalls = res.data;
      } catch {
          ErrorNotifier.notify();
      }
    },
};

export const call: Module<CallState, RootState> = {
    state, actions,
};

