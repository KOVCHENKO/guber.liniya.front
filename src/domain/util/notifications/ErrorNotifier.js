import Vue from 'vue';
class ErrorNotifier {
    static notify() {
        Vue.prototype.$notify({
            title: 'Ошибка',
            text: 'При выполнении запроса произошла ошибка',
        });
    }
    static notifyWithCustomMessage(message) {
        Vue.prototype.$notify({
            title: 'Ошибка',
            text: message,
        });
    }
}
export default ErrorNotifier;
//# sourceMappingURL=ErrorNotifier.js.map