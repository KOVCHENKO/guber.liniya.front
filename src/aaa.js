import * as tslib_1 from "tslib";
var _a, _b, _c, _d;
import { Component, Provide, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import OrganizationState from '../../../../store/functional/organization/types';
import { headings, plusButton } from '@/domain/util/interface/CommonInterface';
import UserState from '../../../../store/common/user/types';
import UpdateStatusClaims from '@/components/functional/claims/UpdateStatusClaims.vue';
import throttle from '../../../../store/util/operations/throttle';
import ClaimService from '../../../../domain/services/functional/claims/ClaimService';
import DatatableCustomPaginator from '../../../../components/util/DatatableCustomPaginator.vue';
import IPaginationState from '../../../../store/util/pagination/types';
import CommentState from '../../../../store/functional/comment/types';
import AppService from '@/domain/services/common/AppService';
import Applicant from '@/views/functional/applications/specialist/filters/Applicant.vue';
import Phone from '@/views/functional/applications/specialist/filters/Phone.vue';
import Address from '@/views/functional/applications/specialist/filters/Address.vue';
import Date from '@/views/functional/applications/specialist/filters/Date.vue';
import BaseFilter from '@/components/base/BaseFilter.vue';
let CreatedClaims = class CreatedClaims extends Vue {
    // TODO: убрать в родителя
    constructor() {
        super();
        this.status = ''; // 'created';
        // TODO: удалить
        this.sortByData = 'desc';
        this.hoverClass = '';
        this.tableColumns = [
            { label: 'Дата', filter: false, component: Date, sort: 'asc', hover: false },
            { label: 'Заявитель', filter: false, component: Applicant, sort: false, hover: false },
            { label: 'Телефон', filter: false, component: Phone, sort: false, hover: false },
            { label: 'Адрес (район / адрес)', filter: false, component: Address, sort: false, hover: false },
            { label: '', icon: 'fas fa-cog' },
        ];
        this.claim = {
            name: '',
            description: '',
            firstname: '',
            middlename: '',
            lastname: '',
            phone: '',
            status: '',
        };
        headings.title = 'Новые заявки';
        plusButton.visible = false;
    }
    get throttledSearch() {
        return throttle(this.startSearch, 2000);
    }
    get dataFilter() {
        return {
            organization_id: this.userState.user.organization.id,
            status: this.status,
            initials: '', phone: '', address: '',
            minDate: '', maxDate: '',
        };
    }
    fullname(claim) {
        if (claim.hasOwnProperty('applicant')) {
            const key = ['firstname', 'middlename', 'lastname'];
            return AppService.assembleString(claim.applicant, key);
        }
        else {
            return AppService.assembleString({}, []);
        }
    }
    address(claim) {
        if (claim.hasOwnProperty('address')) {
            const key = ['city', 'district', 'street', 'building'];
            return AppService.assembleString(claim.address, key, ', ');
        }
        else {
            return AppService.assembleString({}, []);
        }
    }
    startSearch() {
        // Обнулить и поставить страницу №1
        this.paginationState.currentPage = 1;
        this.getAllClaimsOfOrganization2(this.dataFilter);
    }
    created() {
        this.startSearch();
    }
    show(row) {
        this.commentState.comment.text = '';
        this.claim = row;
        $('#updateStatusClaims').modal('show');
    }
    get claims() {
        return ClaimService.changeTimeFormat(this.organizationState.claims);
    }
    // public sortByDataFunc() {
    //     this.sortByData = (this.sortByData === 'desc') ? 'asc' : 'desc';
    //     this.getAllClaimsOfOrganization({
    //         organization_id : this.userState.user.organization.id,
    //         dispatchStatusFilter : this.dispatchStatusFilter,
    //         search : this.searchField, sortByData: this.sortByData });
    // }
    useFilter(row) {
        const filter = !row.filter;
        this.tableColumns.map(function (column) {
            if (column.hasOwnProperty('filter')) {
                column.filter = false;
            }
            return column;
        });
        row.filter = filter;
    }
    sortClaims(row) {
        row.hover = false;
        const sort = (row.sort == 'asc') ? 'desc' : 'asc';
        this.tableColumns.map(function (column) {
            if (column.hasOwnProperty('sort')) {
                column.sort = false;
            }
            return column;
        });
        row.sort = sort;
    }
};
tslib_1.__decorate([
    Provide(),
    tslib_1.__metadata("design:type", String)
], CreatedClaims.prototype, "status", void 0);
tslib_1.__decorate([
    Provide(),
    tslib_1.__metadata("design:type", String)
], CreatedClaims.prototype, "sortByData", void 0);
tslib_1.__decorate([
    Provide(),
    tslib_1.__metadata("design:type", String)
], CreatedClaims.prototype, "hoverClass", void 0);
tslib_1.__decorate([
    State('organization'),
    tslib_1.__metadata("design:type", typeof (_a = typeof OrganizationState !== "undefined" && OrganizationState) === "function" && _a || Object)
], CreatedClaims.prototype, "organizationState", void 0);
tslib_1.__decorate([
    State('user'),
    tslib_1.__metadata("design:type", typeof (_b = typeof UserState !== "undefined" && UserState) === "function" && _b || Object)
], CreatedClaims.prototype, "userState", void 0);
tslib_1.__decorate([
    State('pagination'),
    tslib_1.__metadata("design:type", typeof (_c = typeof IPaginationState !== "undefined" && IPaginationState) === "function" && _c || Object)
], CreatedClaims.prototype, "paginationState", void 0);
tslib_1.__decorate([
    State('comment'),
    tslib_1.__metadata("design:type", typeof (_d = typeof CommentState !== "undefined" && CommentState) === "function" && _d || Object)
], CreatedClaims.prototype, "commentState", void 0);
tslib_1.__decorate([
    Action('getAllClaimsOfOrganization'),
    tslib_1.__metadata("design:type", Object)
], CreatedClaims.prototype, "getAllClaimsOfOrganization", void 0);
tslib_1.__decorate([
    Action('getAllClaimsOfOrganization2'),
    tslib_1.__metadata("design:type", Object)
], CreatedClaims.prototype, "getAllClaimsOfOrganization2", void 0);
tslib_1.__decorate([
    Action('getAllChildrenOrganization'),
    tslib_1.__metadata("design:type", Object)
], CreatedClaims.prototype, "getAllChildrenOrganization", void 0);
tslib_1.__decorate([
    Provide(),
    tslib_1.__metadata("design:type", Object)
], CreatedClaims.prototype, "tableColumns", void 0);
tslib_1.__decorate([
    Provide(),
    tslib_1.__metadata("design:type", Object)
], CreatedClaims.prototype, "claim", void 0);
CreatedClaims = tslib_1.__decorate([
    Component({
        components: {
            UpdateStatusClaims, DatatableCustomPaginator, BaseFilter,
        },
    }),
    tslib_1.__metadata("design:paramtypes", [])
], CreatedClaims);
export default CreatedClaims;
//# sourceMappingURL=aaa.js.map