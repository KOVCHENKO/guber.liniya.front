import { makeBunchOfPages, slicePages } from '@/domain/util/interface/Pagination';
export const state = {
    currentPage: 1,
    lastPage: 0,
    pagesArray: [],
    pageCursor: '',
    slicedPagesNumber: [],
    changedSlicedPagesNumber: [],
};
export const actions = {
    formPagination(context, payload) {
        state.lastPage = payload.lastPage;
        state.pagesArray = makeBunchOfPages(state.lastPage);
        state.slicedPagesNumber = slicePages(5, state.lastPage, state.currentPage, state.pagesArray);
    },
};
export const pagination = {
    state, actions,
};
//# sourceMappingURL=pagination.js.map