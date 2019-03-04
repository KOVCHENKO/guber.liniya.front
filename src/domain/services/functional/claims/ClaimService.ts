import IClaim from '@/domain/entities/functional/interfaces/IClaim';
import {DISPATCHED, EDITED, PREPARED, RAW} from '@/domain/services/functional/roles/interfaces/dispatchStatusTypes';
import TimeFormatter from '@/domain/util/formatters/TimeFormatter';

class ClaimService {

    /**
     * Resolves raw claims from server
     * @param claims
     */
    public static resolveClaimDispatchStatus(claims: IClaim[]) {
        return claims.map( (b: any) => {
            switch (b.dispatch_status) {
                case RAW:  b.dispatch_status = 'Необработанна'; break;
                case PREPARED:  b.dispatch_status = 'Создана'; break;
                case EDITED:  b.dispatch_status = 'Отредактирована'; break;
                case DISPATCHED:  b.dispatch_status = 'Отправлена'; break;
            }
            return b;
        });
    }

    public static reverseClaimDispatchStatus(dispatchStatus: string) {
        switch (dispatchStatus) {
            case 'Необработанна':  return RAW;
            case 'Создана':  return PREPARED;
            case 'Отредактирована':  return EDITED;
            case 'Отправлена':  return DISPATCHED;
        }
    }

    /**
     * Resolves raw claims from server
     * @param claims
     */
    public static resolveClaimStatus(claims: [{}]) {
        return claims.map( (b: any) => {
            switch (b.status) {
                case 'created':  b.status = 'Создана'; break;
                case 'executed':  b.status = 'Выполнена'; break;
                case 'rejected':  b.status = 'Отказано'; break;
                case 'assigned':  b.status = 'Назначена'; break;
            }
            return b;
        });
    }

    /**
     * Добавляет статус на русском языке - при этом оставляя простой (на англ.яз из БД) для взаимодействия
     * @param claims
     * @returns {any}
     */
    public static addTranslatedClaimStatus(claims: IClaim[]) {
        return claims.map( (b: any) => {
            switch (b.status) {
                case 'created':  b.translatedStatus = ''; break;
                case 'executed':  b.translatedStatus = 'Выполнена'; break;
                case 'rejected':  b.translatedStatus = 'Отказано'; break;
                case 'assigned':  b.translatedStatus = 'Назначена'; break;
            }
            return b;
        });
    }

    /**
     * Добавляет статус на русском языке - при этом оставляя простой (на англ.яз из БД) для взаимодействия
     * @param claims
     * @returns {any}
     */
    public static addTranslatedCloseStatus(claims: IClaim[]) {
        return claims.map( (b: any) => {
            switch (b.close_status) {
                case 'raw':  b.translatedCloseStatus = ''; break;
                case 'not_executed':  b.translatedCloseStatus = 'Ничего не сделано'; break;
                case 'executed_partially':  b.translatedCloseStatus = 'Выполнена частично'; break;
                case 'executed_totally':  b.translatedCloseStatus = 'Выполнена полностью'; break;
            }
            return b;
        });
    }

    /**
     * Добавляет статус на русском языке - при этом оставляя простой (на англ.яз из БД) для взаимодействия
     * @param claims
     * @returns {any}
     */
    public static addTranslatedSubcontractorStatus(subcontractor: any) {
        switch (subcontractor.status) {
            case 'opened':  return 'Открыто';
            case 'closed':  return 'Закрыто';
        }
    }

    public static changeTimeFormat(claims: IClaim[]) {
        return claims.map((claim: IClaim) => {
            claim.created_at_shortened = TimeFormatter.formatTime(claim.created_at);
            return claim;
        });
    }

    /**
     * Добавить исполняющую организацию. Если ее нет, то поставить признак "Отсутствует"
     * @param claims
     */
    public static setExecutiveOrganization(claims: IClaim[]): IClaim[] {
        return claims.map((claim: IClaim) => {

            // @ts-ignore
            if (claim.responsible_organization.length !== 0) {
                // @ts-ignore
                claim.responsibleOrganizationName = claim.responsible_organization[0].name;
            } else {
                claim.responsibleOrganizationName = 'Отсутствует';
            }

            return claim;
        });
    }

    public updateClaimInCollection(claims: IClaim[], claim: IClaim) {
        const subIndex = claims.map((e) => {
            return e.id;
        }).indexOf(claim.id);

        // claims[subIndex].created_at = claim.createdAt;
        claims[subIndex].name = claim.name;
        claims[subIndex].description = claim.description;
        claims[subIndex].address = claim.address;
        claims[subIndex].phone = claim.phone;
        claims[subIndex].dispatch_status = claim.dispatchStatus;
        claims[subIndex].status = claim.status;

        return claims;
    }

    /**
     * Разрулить фильтры
     * @param payload
     */
    public resolveFilters(payload: any) {
        if (payload.dispatchStatus == null) { payload.dispatchStatus = 'all'; }
        if (payload.dispatchStatusFilter == null) { payload.dispatchStatusFilter = ''; }
        if (payload.statusFilter == null) { payload.statusFilter = ''; }
        if (payload.closeStatusFilter == null) { payload.closeStatusFilter = ''; }
        if (payload.sortBy == null) { payload.sortBy = 'created_at'; }
        if (payload.sortDirection == null) { payload.sortDirection = 'desc'; }

        return payload;
    }



}

export default ClaimService;
