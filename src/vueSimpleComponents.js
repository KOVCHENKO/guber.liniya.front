/* Файл для импорта простых компонентов vue */
import Vue from 'vue';

// Header для фильтрации по статусам отправки
import ProcessStatusSelector from './components/functional/applications/DispatcherApplications/partials/ProcessStatusSelector';
Vue.component('process-status-selector', ProcessStatusSelector);
