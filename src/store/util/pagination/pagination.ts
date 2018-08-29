import IPaginationState from '@/store/util/pagination/types';
import {ActionTree, Module} from 'vuex';
import RootState from '@/store/types';
import {makeBunchOfPages, slicePages} from '@/domain/util/interface/Pagination';

export const state: IPaginationState = {
    currentPage: 1,
    lastPage: 0,
    pagesArray: [],
    pageCursor: '',
    slicedPagesNumber: [],
    changedSlicedPagesNumber: [],
};

export const actions: ActionTree<IPaginationState, RootState> = {
    formPagination(context, payload) {
        state.lastPage = payload.lastPage;
        state.pagesArray = makeBunchOfPages(state.lastPage);
        state.slicedPagesNumber = slicePages(5, state.lastPage, state.currentPage, state.pagesArray);
    },
};

export const pagination: Module<IPaginationState, RootState> = {
    state, actions,
};
