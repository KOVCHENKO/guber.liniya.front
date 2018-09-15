import ClaimState from '@/store/functional/claim/types';
import {ActionTree, Module} from 'vuex';
import RootState from '@/store/types';
import axios from 'axios';
import {baseUrl} from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import Claim from '@/domain/entities/functional/Claim';
import Problem from '@/domain/entities/functional/Problem';
import Address from '@/domain/entities/functional/Address';
import SuccessNotifier from '@/domain/util/notifications/SuccessNotifier';
import Call from '@/domain/entities/functional/Call';
import ClaimService from '@/domain/services/functional/claims/ClaimService';

export const state: ClaimState = {
    claim: new Claim(0, '', '', '', '', '', '', '', '', '', '', null, [{}], [],
                        new Address(0, 'Астрахань', ''),
                        new Problem(0, 'Выберите проблему', ''),
                        new Call(0, '', '', '', 'success', 'in',  '', '', '')),
    claims: [],
    previousClaims: [],     // Предыдущие по номеру телефона
    executedClaims: [],     // Выполненные заявки для роли комуникатора
    confirmationFiles: [],
};

const claimService = new ClaimService();

export const actions: ActionTree<ClaimState, RootState> = {
    /**
     * Получить все заявки
     * @param {any} rootState - пагинация
     * @param {any} dispatch - формирование кол-ва страниц для пагинации
     * @param payload - статус отправки для диспетчера, редактора и отправителя
     * @returns {Promise<void>} - возвращает заявки и присваивает в state
     */
    async getAllClaims({rootState, dispatch}, payload) {
        try {
            const result = await axios.get(`${baseUrl}claims/all/
                                                    ${rootState.pagination.currentPage}/${payload.dispatchStatus}`);
            state.claims = result.data.claims;
            dispatch('formPagination', { lastPage: result.data.pages });
        } catch {
            ErrorNotifier.notify();
        }
    },

    /**
     * Создать заявку / жалобу
     * @returns {Promise<void>} - создается заявка, так как создание происходит в компоненте звонков -
     * заявка не отображается
     */
    async createClaim() {
        try {
            await axios.post(`${baseUrl}claims/create`, state.claim);
            SuccessNotifier.notify('Заявка', 'Создана новая заявка');
        } catch {
            ErrorNotifier.notify();
        }
    },

    /**
     * Обновить заявку
     * @param payload - обновляется статус отправки: raw, prepared, edited, supervised
     * @returns {Promise<void>} - обнволенная заявка добавляется в коллекцию
     */
    async updateClaim({}, payload) {
        try {
            await axios.post(`${baseUrl}claims/update/${payload.updatedDispatchStatus}`, state.claim);

            state.claim.dispatchStatus = payload.updatedDispatchStatus;
            state.claims = claimService.updateClaimInCollection(state.claims, state.claim);

            SuccessNotifier.notify('Заявка', 'Заявка обновлена');
        } catch {
            ErrorNotifier.notify();
        }
    },

    /**
     * Поиск заявки
     * @param {any} rootState - пагинация - текущая страница
     * @param {any} dispatch - формирование пагинации
     * @param payload - строка поиска по определенным полям и статус отправки (для разных ролей диспетчера)
     * @returns {Promise<void>} - возвращает найденные заявки по определенному критерию
     */
    async searchClaim({rootState, dispatch}, payload) {
        try {
            const result = await axios.post(`${baseUrl}claims/search`, {
                currentPage: rootState.pagination.currentPage,
                search: payload.search,
                dispatchStatus: payload.dispatchStatus,
            });
            state.claims = result.data.claims;
            dispatch('formPagination', { lastPage: result.data.pages });
        } catch {
            ErrorNotifier.notify();
        }
    },

    /**
     * Изменить статус заявки (роли диспетчера, специалиста или коммуникатора)
     * @param context - dummy
     * @param payload - ид заявки, статус заявки
     * @returns {Promise<void>} - обновляется в компоненте
     */
    async changeStatusClaim(context, payload) {
        try {
            await axios.get(`${baseUrl}claims/update_status/${payload.id}/${payload.status}`);
            SuccessNotifier.notify('Заявка', 'Статус заявки изменен');
        } catch {
            ErrorNotifier.notify();
        }
    },

    /**
     * Получить заявки по тому же номеру телефона - заявки
     * @returns {Promise<void>}
     */
    async getClaimsOfTheSamePhone() {
        try {
            const res = await axios.post(`${baseUrl}claims/get_previous_by_phone`, {
                phone: state.claim.phone,
            });
            state.previousClaims = res.data;
        } catch {
            ErrorNotifier.notify();
        }
    },

    /**
     * Получить выполненные заявки - для роли коммуникатора
     * @returns {Promise<void>}
     */
    async getExecutedClaims() {
        try {
            const res = await axios.get(`${baseUrl}claims/get_executed_claims`);
            state.executedClaims = res.data;
        } catch {
            ErrorNotifier.notify();
        }
    },

    async closeClaim({dispatch}, payload) {
        try {
            const url = `${baseUrl}claims/change_close_status/${payload.claim_id}/${payload.close_status}`;
            const res = await axios.get(url);
            dispatch('getExecutedClaims');
            SuccessNotifier.notify('Завершение', `Заявка закрыта со статусом ${payload.close_status}`);
        } catch {
            ErrorNotifier.notify();
        }
    },

    /**
     * Изменение организации, ответственной за выполнение заявки
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async changeOrganization(context, payload) {
        try {
            await axios.get(`${baseUrl}claims/change_organization/${payload.id}/
                    ${payload.id_old_organization}/${payload.id_new_organization}`);
            SuccessNotifier.notify('Заявка', 'Отвественная организация изменена');
        } catch {
            ErrorNotifier.notify();
        }
    },

    async reassignRejectedClaim({dispatch}, payload) {
        try {
            await axios.get(`${baseUrl}claims/reassign_rejected_claim/${payload.organizationId}/${state.claim.id}`);
            state.claim.status = payload.status;
            state.claims = claimService.updateClaimInCollection(state.claims, state.claim);
        } catch {
            ErrorNotifier.notify();
        }
    },

};

export const claim: Module<ClaimState, RootState> = {
    state, actions,
};
