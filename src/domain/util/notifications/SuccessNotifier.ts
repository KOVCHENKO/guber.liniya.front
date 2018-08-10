import Vue from 'vue';

class SuccessNotifier {

    public static notify(title, text) {
        Vue.prototype.$notify({
            title, text,
        });
    }
}

export default SuccessNotifier;
