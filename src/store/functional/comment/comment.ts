import CommentState from '@/store/functional/comment/types';
import {ActionTree, Module} from 'vuex';
import RootState from '@/store/types';
import axios from 'axios';
import {baseUrl} from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import SuccessNotifier from '@/domain/util/notifications/SuccessNotifier';

export const state: CommentState = {
    comment: {
        text: '',
        claim_id: 0,
        status: '',
    },
};

export const actions: ActionTree<CommentState, RootState> = {

    async createComment() {
        try {
            await axios.post(`${baseUrl}comments/create`, state.comment);
            SuccessNotifier.notify('Заявка', 'Комментарий добавлен');
        } catch {
            ErrorNotifier.notify();
        }
    },

};

export const comment: Module<CommentState, RootState> = {
    state, actions,
};
