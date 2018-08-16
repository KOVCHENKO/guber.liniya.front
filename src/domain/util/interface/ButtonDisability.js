export const checkButtonDisability = (fields) => {
    for (const field of fields) {
        if (field === '') {
            return false;
        }
    }
    return false;
};
//# sourceMappingURL=ButtonDisability.js.map