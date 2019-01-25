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
            location: '',
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
};
export const applicant = {
    state, actions,
};
//# sourceMappingURL=applicant.js.map