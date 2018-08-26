import Vue from 'vue';

class ErrorNotifier {

    public static notify() {
        Vue.prototype.$notify({
            title: 'Ошибка',
            text: 'При выполнении запроса произошла ошибка',
        });
    }

    public static notifyWithCustomMessage(message) {
        Vue.prototype.$notify({
            title: 'Ошибка',
            text: message,
        });
    }
}

export default ErrorNotifier;
