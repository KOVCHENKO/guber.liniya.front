export const makeBunchOfPages = (lastPage) => {
    const pages = Array.apply(null, { length: lastPage + 1 })
        .map(Number.call, Number);
    pages.shift();
    return pages;
};
export const slicePages = (qntyOfSlicedPages, lastPage, currentPage, pages) => {
    let slicedPagesNumber = [];
    if (lastPage < 5) {
        return slicedPagesNumber = pages;
    }
    else {
        return slicedPagesNumber =
            pages.slice(currentPage - 1, currentPage + 5);
    }
};
//# sourceMappingURL=Pagination.js.map