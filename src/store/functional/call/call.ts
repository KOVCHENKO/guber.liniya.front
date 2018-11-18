import CallState from '@/store/functional/call/types';
import Call from '@/domain/entities/functional/Call';
import {ActionTree, Module} from 'vuex';
import RootState from '@/store/types';
import axios from 'axios';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import {baseUrl} from '@/globals';

export const state: CallState = {
    call: new Call(0, '', '', '', 'success', 'in',  '', '', ''),
    calls: [],
    filter: {
        dateFilter: 'all',
        from: '2018-01-01',
        to: '2019-01-01',
    },
};

export const actions: ActionTree<CallState, RootState> = {
    async getCalls({rootState, dispatch}) {
      try {
          const res = await axios.post(`${baseUrl}calls/all/${rootState.pagination.currentPage}`, {
              dateFilter: state.filter.dateFilter,
              from: state.filter.from,
              to: state.filter.to,
          });
          state.calls = res.data.calls;
          dispatch('formPagination', { lastPage: res.data.pages });
      } catch {
          ErrorNotifier.notify();
      }
    },


    async markCallAsFaulty({dispatch}) {
        try {
            await axios.get(`${baseUrl}calls/mark_call_as_faulty/${state.call.id}`);
            dispatch('getCalls');
        } catch {
            ErrorNotifier.notify();
        }
    },
};

export const call: Module<CallState, RootState> = {
    state, actions,
};

