class AppService {
    static checkEmptyValue(value) {
        return (value != null && value !== '');
    }
    static assembleString(array, key, bind = ' ') {
        let line = '';
        const self = this;
        key.forEach((item, i) => {
            line += (self.checkEmptyValue(array[item])) ? array[item] + bind : '';
        });
        line = line.slice(0, -(bind.length));
        return (this.checkEmptyValue(line)) ? line : 'Нет данных';
    }
}
export default AppService;
//# sourceMappingURL=AppService.js.map