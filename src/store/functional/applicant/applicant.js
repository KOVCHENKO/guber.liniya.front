import axios from 'axios';
import { baseUrl } from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
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
};
export const actions = {
    async getApplicants() {
        try {
            const res = await axios.get(`${baseUrl}applicants/all`);
        }
        catch {
            ErrorNotifier.notify();
        }
    },
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
    state, actions,
};
//# sourceMappingURL=applicant.js.map