import axios from 'axios';
import { baseUrl } from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import { makePages } from '@/domain/util/interface/Pagination';
export const state = {
    applicant: {
        id: 0,
        firstname: '',
        lastname: '',
        middlename: '',
        phone: '',
        email: '',
        address: {
            id: 0,
            district: '',
            city: '',
            street: '',
            building: '',
        },
    },
    applicants: [],
    // Пагинация для заявителей
    currentPage: 1,
    lastPage: 0,
    pagesArray: [{}],
    pageCursor: '',
};
export const mutations = {
    makeApplicantPagination(state, payload) {
        state.lastPage = payload.lastPage;
        state.pagesArray = makePages(state.currentPage, state.lastPage);
    },
};
export const actions = {
    /**
     * @param commit - номер страницы
     * @param payload - search: строка поиска
     * В запросе возвращается: applicants - заявители, pages - кол-во страниц
     */
    async getApplicants({ commit }, payload) {
        try {
            const res = await axios.post(`${baseUrl}applicants/all/${state.currentPage}`, {
                search: payload.search,
            });
            state.applicants = res.data.applicants;
            commit('makeApplicantPagination', { lastPage: res.data.pages });
        }
        catch {
            ErrorNotifier.notify();
        }
    },
    /**
     * Создать заявителя
     */
    async createApplicant() {
        try {
            const res = await axios.post(`${baseUrl}applicants/create`, state.applicant);
            state.applicants.push(res.data);
        }
        catch {
            ErrorNotifier.notify();
        }
    },
};
export const applicant = {
    state, actions, mutations,
};
//# sourceMappingURL=applicant.js.map