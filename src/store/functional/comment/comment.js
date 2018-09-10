import axios from 'axios';
import { baseUrl } from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import SuccessNotifier from '@/domain/util/notifications/SuccessNotifier';
export const state = {
    comment: {},
};
export const actions = {
    async createComment() {
        try {
            await axios.post(`${baseUrl}comments/create`, state.comment);
            SuccessNotifier.notify('Заявка', 'Комментарий добавлен');
        }
        catch {
            ErrorNotifier.notify();
        }
    },
};
export const comment = {
    state, actions,
};
//# sourceMappingURL=comment.js.map