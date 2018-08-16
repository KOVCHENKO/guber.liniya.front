export const checkButtonDisability = (fields: string[]): boolean => {
    for (const field of fields) {
        if (field === '') {
            return false;
        }
    }

    return false;
};
