class AppService {

    public static checkEmptyValue(value) {
        return (value != null && value !== '');
    }

    public static checkProperty(object, property) {
        return (object.hasOwnProperty(property) && object[property] !== null);
    }

    public static assembleStringCheck(object, key, property, bind = ' ') {
        if (this.checkProperty(object, property)) {
            return this.assembleString(object[property], key, bind);
        } else {
            return AppService.assembleString({}, [], bind);
        }
    }

    public static assembleString(array, key, bind = ' ') {
        let line = '';
        const self = this;

        key.forEach((item, i) => {
            line += (self.checkEmptyValue(array[item])) ? array[item] + bind : '';
        });
        line = line.slice(0, -(bind.length));

        return (this.checkEmptyValue(line)) ? line : 'Нет данных';
    }

    public static assembleParamUrl(array, key) {
        let line = '';
        const self = this;
        key.forEach((item, i) => {
            line += (self.checkEmptyValue(array[item])) ? item + '=' + array[item] + '&' : '';
        });
        line = line.slice(0, -1);
        return (this.checkEmptyValue(line)) ? '?' + line : '';
    }

}

export default AppService;
