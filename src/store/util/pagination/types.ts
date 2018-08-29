export default interface IPaginationState {
    currentPage: number;
    lastPage: number;
    pagesArray: number[];
    pageCursor: string;
    slicedPagesNumber: number[];
    changedSlicedPagesNumber: number[];
}
