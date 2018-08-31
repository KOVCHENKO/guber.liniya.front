export const makePages = (currentPage, lastPage) => {
    let arrayPages : any = [];
    let firstPage = 1;
    
    for (var i = firstPage; i <= lastPage; i++) {
        if (i == firstPage || i == lastPage 
            || (i <= currentPage + 2 && i >= currentPage-2) ) {
            
            arrayPages.push(i);
        }
        else if (i == firstPage + 1 || i == lastPage - 1) {
            arrayPages.push(-1);
        } 
    }

    return arrayPages;
};
