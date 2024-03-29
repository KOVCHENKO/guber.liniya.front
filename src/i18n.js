import VueI18n from 'vue-i18n';
const messages = {
    ru: {
        index: {
            login: 'Войти',
            r_message: 'Первый этап регистрации успешно пройден. На ваш email было отправлено сообщение' +
                ' с ссылкой активации аккаунта и инструкциями',
            notify_relogin_title: 'Ошибка сессии',
            notify_relogin_text: 'Сессия просрочена либо кто-то воспользовался Вашей учетной записью на другом' +
                ' устройстве',
            error_relogin_title: 'Ошибка',
            error_relogin_text: 'Во время выполнения запоса произошла ошибка',
        },
        services: {
            upload_delete: 'Удалить',
            upload_button_title: 'Выбрать файлы на компьютере',
            upload_button: 'Выбрать файлы',
        },
        top_menu: {
            logo_title: 'школа.видео',
            psychologist_title: 'Психологическая помощь',
            psychologist_text: 'Психолог',
            main_menu_title: 'Главное меню',
            main_menu_archive: 'Архив записей',
            main_menu_online: 'Прямой эфир',
            button_cabinets_title: 'Кабинеты',
            button_cabinets_text: 'Кабинеты',
            button_profile_title: 'Редактировать личные данные',
            button_profile_text: 'Личные данные',
            button_information_title: 'Информация для родителей',
            button_information_text: 'Информация для родителей',
            button_help_title: 'Справка',
            button_help_text: 'Справка',
            button_exit_title: 'Выход',
            button_exit_text: 'Выйти из системы',
            popover_datai: 'Нет новых уведомлений',
            right_content_close: 'Свернуть список',
            cabinets_title: 'Кабинеты',
        },
        cabinets_s: {
            delete_confirmation: 'Вы уверены, что хотите удалить данный кабинет?',
            module_title: 'Кабинеты',
            module_add_title: 'Добавить новый кабинет',
        },
        common: {
            show: 'Показать',
            delete: 'Удалить',
            manager: 'Управление',
            name: 'Наименование',
            description: 'Описание',
            save: 'Сохранить',
            save_and_close: 'Сохранить и закрыть',
            close: 'Закрыть',
            create: 'Создать',
            create_more: 'Создать еще',
            update: 'Обновить',
            send: 'Отправить',
            delete_notification_title: 'Удаление',
            create_notification_title: 'Создание',
            update_notification_title: 'Обновление',
            bound_notification_title: 'Прикрепление',
            assign_notification_title: 'Изменение назначено',
            address: 'Адрес',
            country: 'Страна',
            city: 'Населенный пункт',
            street: 'Улица',
            building: 'Дом, строение',
            new: 'Новый',
            search: 'Поиск',
            prev: 'Назад',
            answer: 'Ответить',
            pay: 'Оплатить',
            edit: 'Изменить',
            choose: 'Выбрать',
        },
        errors: {
            query_error_title: 'ошибка',
            query_error: 'ошибка при выполнении запроса',
        },
        validation: {
            element: 'элемент',
            title: 'наименование',
            privilege_element_exists: 'Измените название элемента, так как такое наименование уже существует',
            name: 'наименование',
            description: 'описание',
            inn: 'ИНН',
            kpp: 'КПП',
            full_name: 'полное наименование',
            address: 'адрес',
            dir: 'путь',
            email: 'email',
            firstname: 'firstname',
            lastname: 'lastname',
            middlename: 'middlename',
            street: 'улица',
            building: 'здание',
            flat: 'квартира',
            phone: 'телефон',
            personal_account: 'лицевой счет',
            alias: 'алиас',
            city: 'город',
            cost: 'стоимость',
            field_month_count: 'кол-во месяцев',
            rate_services_quantity: 'кол-во посещений',
            login: 'логин',
            password: 'пароль',
        },
        desktop: {
            cabinet_label_user: 'Пользователь',
            cabinet_label_contractor: 'Контрагент',
        },
        problem_type: {
            create_modal_name: 'Создать новую категорию',
            problem_type_name: 'Наименование категории',
            problem_type_description: 'Описание категории',
        },
        problem: {
            create_modal_name: 'Создать новую проблему',
            problem_name: 'Наименование проблемы',
            problem_description: 'Описание проблемы',
        },
        organization: {
            create_modal_name: 'Создать ноую организацию',
            organization_name: 'Наименование организации',
            organization_description: 'Описание организации',
            update_modal_name: 'Редактировать организацию',
        },
        claims: {
            claim_name: 'Краткое описание',
            claim_description: 'Описание заявки',
            create_claim_modal_title: 'Создать заявку',
            problems: 'Проблемы',
            problem_types: 'Виды проблем',
            claimer_firstname: 'Имя',
            claimer_middlename: 'Отчество',
            claimer_lastname: 'Фамилия',
            claimer_address: 'Адрес',
            claimer_phone: 'Телефон',
            claimer_email: 'Email',
            claimer_info: 'ФИО',
            call_link: 'Аудио',
        },
        specialist: {
            create_specialist_modal: 'Добавить аккаунт специалиста',
            login: 'Логин (email)',
            password: 'Пароль',
            repassword: 'Повторить пароль',
            reset_password_modal: 'Сбросить пароль',
        },
    },
};
const i18n = new VueI18n({
    locale: 'ru',
    messages,
});
export default i18n;
//# sourceMappingURL=i18n.js.map