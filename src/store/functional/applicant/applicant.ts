import {ActionTree, Module} from 'vuex';
import axios from 'axios';
import ApplicantState from '@/store/functional/applicant/types';
import RootState from '@/store/types';
import {baseUrl} from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';

export const state: ApplicantState = {
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
            location: '',
        },
    },

    applicants: [],
};

export const actions: ActionTree<ApplicantState, RootState> = {
    async getApplicants() {
        try {
            const res = await axios.get(`${baseUrl}applicants/all`);
        } catch {
            ErrorNotifier.notify();
        }
    },
};

export const applicant: Module<ApplicantState, RootState> = {
    state, actions,
};
