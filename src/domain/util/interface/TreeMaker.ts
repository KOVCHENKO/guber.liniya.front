const makeTree = (elements) =>  {
    for (const singleElement of elements) {
        singleElement.text = singleElement.name;
        singleElement.opened = true;
        singleElement.children = [];

        /**
         * Сформировать дерево элементов
         */
        for (const singleChildElement of elements) {
            if (singleChildElement.pid === singleElement.id) {
                singleElement.children.push(singleChildElement);
            }
        }
    }

    /**
     * Оставить только те элементы, у которых есть дочерние
     * @type {{}[]}
     */
    let cleanedTree = [{}];
    cleanedTree = [];
    for (const newSingleElement of elements) {
        if (newSingleElement.pid === null) {
            cleanedTree.push(newSingleElement);
        }
    }

    return cleanedTree;
};

const getSelectedNodes = (elements, selectedIds) => {
    for (const singleElement of elements) {
        singleElement.selected = false;

        for (const singleChildElement of singleElement.children) {
            for (const singleId of selectedIds) {
                if (singleId === singleChildElement.id) {
                    singleChildElement.selected = true;
                }
            }
        }
    }

    return elements;
};

export {makeTree, getSelectedNodes};
