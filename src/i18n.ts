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
        authorities_s: {
            delete_confirmation: 'Вы уверены, что хотите удалить данное полномочие?',
            module_title: 'Полномочия',
            module_add_title: 'Добавить новое полномочие',
            delete_notification: 'Полномочие удалено!',
        },
        authorities_sa: {
            modal_title: 'Карточка полномочия',
            name: 'Наименование полномочия',
            description: 'Описание полномочия',
            type: 'Субъект назначения',
            type_user: 'Пользователь',
            type_auser: 'Пользователь (автоматически)',
            type_cont: 'Контрагент',
            type_acont: 'Контрагент (автоматически)',
            alias: 'Алиас',
            connected_cabinets: 'Подключенные кабинеты',
            available_cabinets: 'Доступные кабинеты',
            choose_cabinets: 'Выберите один или несколько кабинетов, которые необходимо включить в данное полномочие',
            include_cabinets: 'Включить кабинеты',
            create_notification: 'Создано новое полномочие!',
            update_notification: 'Полномочие обновлено!',
        },
        cabinets_s: {
            delete_confirmation: 'Вы уверены, что хотите удалить данный кабинет?',
            module_title: 'Кабинеты',
            module_add_title: 'Добавить новый кабинет',
        },
        cabinets_sc: {
            modal_title: 'Карточка кабинета',
            name: 'Наименование кабинета',
            icon: 'Иконка кабинета',
            description: 'Описание кабинета',
            connected_modules: 'Подключенные функциональные модули',
            available_modules: 'Доступные функциональные модули',
            choose_modules: 'Выберите один или несколько функциональных модулей, которые необходимо включить ' +
            'в данный кабинет',
            include_modules: 'Включить функциональные модули',
            connected_functional_modules: 'Подключенные модули',
            create_notification: 'Создан новый кабинет!',
            update_notification: 'Кабинет обновлен!',
        },
        contractors_s: {
            delete_confirmation: 'Вы уверены, что хотите удалить данного контрагента?',
            module_title: 'Справочник контрагентов',
            module_add_title: 'Добавить нового контрагента',
            name: 'Наименование',
            type: 'Тип',
            INN: 'ИНН',
            KPP: 'КПП',
        },
        contractors_sc: {
            module_title: 'Карточка контрагента',
            organization_entity_form: 'Организационно-правовая форма: *',
            entity: 'Юридическое лицо',
            businessman: 'Индивидуальный предприниматель',
            municipality: 'Муниципальное образование',
            INN: 'ИНН: *',
            short_name: 'Краткое наименование: *',
            short_name_placeholder: 'Молот',
            full_name: 'Полное наименование: *',
            full_name_placeholder: 'ООО НПФ Молот',
            OKPO: 'ОКПО',
            OGRN: 'ОГРН',
            OGRNIP: 'ОГРНИП',
            system_type: 'Системный тип',
            uk: 'Управляющая компания',
            lumper: 'Исполнитель',
            call_center: 'Кол центр',
            service_cost: 'Стоимость оплаты услуг (руб.)',
            payment_date: 'Дата следующей оплаты',
            paid_to: 'Оплачено до',
            encharged_authorities: 'Возложенные полномочия',
            contractor_admins: 'Администраторы контрагента',
            contractor_posts: 'Подразделения контрагента',
            all_subsystem_authorities: 'Все полномочия подсистемы',
            authorities_modal_description: 'Выберите одно или несколько полномочий, которые необходимо возложить' +
            ' на контрагента',
            choose_and_add_authorities: 'Выбрать и добавить полномочия',
            all_users_modal_setting: 'Все пользователи',
            all_users_description_modal_setting: 'Выберите одного или нескольких пользователей, которые будут ' +
            'работать от имени контрагента',
            choose_and_add_admins: 'Выбрать и добавить управляющих',
            create_post: 'Создать новое подразделение',
            local_inn_exists: 'Контрагент с таким ИНН уже существует',
            create_notification: 'Создан новый контрагент',
            update_notification: 'Информация по контрагенту обновлена',
        },
        post_sc: {
            module_title: 'Карточка структутрного подразделения',
            field_name: 'Полное наименование',
            field_title: 'Наименование',
            field_description: 'Описание',
            create_notification: 'Создано новое структурное подразделение',
            edit_notification: 'Структурное подразделение изменено',
            field_authorities: 'Возложенные полномочия',
            field_users: 'Сотрудники подразделения',
            cm_authorities_title: 'Выбрать полномочия',
            cm_authorities_description: 'Выбрать одно или несколько полномичий, которые необходимо возложить ' +
            'на структурное подразделение контрагента',
            ci_authorities_title: 'Выбрать полномочия',
            cm_users_title: 'Выбрать пользователей',
            cm_users_description: 'Выбрать одно или несколько работников структурного подразделения из списка ' +
            'пользователей системы',
            ci_users_title: 'Выбрать пользователей',
            module_add_title: 'Добавить новое структурное подразделение',
        },
        func_modules_s: {
            delete_confirmation: 'Вы уверены, что хотите удалить данный функциональный модуль?',
            param_subtitle: 'Функциональные модули',
            param_add_module: 'Добавить новый модуль',
            path_in_system: 'Путь в системе',
        },
        func_modules_sm: {
            module_title: 'Карточка функционального модуля',
            func_module_name: 'Наименование функционального модуля',
            func_module_description: 'Описание функционального модуля',
            path_in_system: 'Путь в системе',
            func_modules_roles: 'Необходимые роли',
            available_roles: 'Доступные роли',
            roles_description_modal_setting: 'Выберите одну или несколько ролей, которые необходимы для работы в' +
            ' данном кабинете',
            include_roles_setting: 'Включить роли',
            create_notification: 'Создан новый функциональный модуль',
            update_notification: 'Функциональный модуль обновлен',
        },
        privileges_cp: {
            module_title: 'Создать привилегию',
            element: 'Элемент',
            privilege_name: 'Наименование привилегии',
            created_notification: 'Привилегия создана!',
        },
        privileges_s: {
            delete_confirmation: 'Вы уверены, что хотите удалить данную привилегию?',
            component_title: 'Привилегии',
            data_table_element: 'Элемент',
            data_table_title: 'Наименование',
        },
        privileges_sp: {
            module_title: 'Карточка привилегии',
            element: 'Элемент',
            title: 'Наименование',
            updated_notification: 'Привилегия обновлена!',
        },
        roles_s: {
            delete_confirmation: 'Вы уверены, что хотите удалить данную роль?',
            component_title: 'Роли',
            add_new_role_button_title: 'Добавить новую роль',
        },
        roles_sr: {
            module_title: 'Карточка роли',
            role_name: 'Наименование роли',
            role_description: 'Описание роли',
            included_privileges: 'Привилегии',
            privileges_modal_title: 'Доступные привилегии',
            privileges_modal_description: 'Выберите одну или несколько привилегий, которые необходимо ' +
            'включить в данную роль',
            privileges_modal_include_title: 'Включить привилегии',
            attrib_select: 'Получение данных',
            attrib_insert: 'Добавление данных',
            attrib_update: 'Изменение данных',
            attrib_delete: 'Удаление данных',
            attrib_approve: 'Утверждение данных',
            create_notification: 'Роль создана!',
            update_notification: 'Роль обновлена',
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
        },
        desktop: {
            cabinet_label_user: 'Пользователь',
            cabinet_label_contractor: 'Контрагент',
        },
        /* Видеонаблюдение */
        video_school: {
            help: {
                title: 'Справка',
                profile: 'Профиль Пользователя',
                pay: 'Оплата услуг',
            },
            profile: {
                title: 'Личные данные',
                field_avatar_title: 'Сменить аватарку профиля',
                field_email_title: 'Email',
                field_email_text: 'Email',
                field_firstname_title: 'Имя пользователя (псевдоним)',
                field_firstname_text: 'Имя пользователя (псевдоним)',
                field_gender_title: 'Пол',
                field_gender_text: 'Пол',
                field_contract_number_text: 'Номер договора',
                field_gender_male: 'Мужской',
                field_gender_female: 'Женский',
                field_password_desc: 'Для того, что изменить пароль входа, необходимо ввести его два раза. ' +
                'Оставьте эти поля пустыми, если не хотите изменять пароль',
                field_password_title: 'Новый пароль',
                field_password_text: 'Новый пароль',
                field_password2_title: 'Повторите парольля',
                field_password2_text: 'Повторите пароль',
                button_save: 'Сохранить',
                success_title: 'Обновление личных данных',
                success_text: 'Ваши данные успешно обновлены',
            },
            user: {
                activation_title: 'Активация аккаунта',
                activation_err_title: 'Ошибка активации аккаунта',
                activation_err_text: 'данный аккаунт уже был активирован, либо время активации аккаунта истекло. ' +
                'Вы будете автоматически перенаправленны на страницу входа через',
                activation_done_title: 'Аккаунт активирован',
                activation_done_text: 'данный аккаунт успешно активирован. Вы будете автоматически перенаправленны ' +
                'на страницу входа через',
                activation_err_text_s: 'сек.',
                activation_err_link: 'перейти на страницу авторизации',
                activation_avatar: 'Загрузите изображение',
                activation_avatar_delete: 'Удалить',
                activation_password: 'Создайте новый пароль',
                activation_repassword: 'Повторите пароль',
                activation_firstname: 'Укажите Ваш псевдоним',
                activation_male: 'мужской',
                activation_female: 'женский',
                activation_license: 'Я согласен/на с условиями',
                activation_license_link: 'данного лицензионного соглашения',
                activation_button: 'Активировать аккаунт',
                activation_term: 'Пользовательское соглашение',
                activation_term_text: 'данного Пользовательского соглашения',
                activation_policy: 'Политика конфиденциальности',
                activation_policy_text: 'Политики конфиденциальности',
                authentication_title: 'Вход в систему',
                authentication_login: 'Введите свой email или номер договора',
                authentication_password: 'Введите пароль',
                authentication_button: 'Войти в систему',
                authentication_forgot_button: 'Забыли пароль?',
                forgot_dialog_title: 'Форма восстановления пароля',
                forgot_dialog_login: 'Введите свой email или номер договора',
                forgot_authentication_button: 'Страница входа',
                forgot_dialog_button: 'Восстановить пароль',
                forgot_dialog_done_title: 'Восстановление доступа',
                forgot_dialog_done_text: 'Инструкция по восстановлению доступа к аккаунту выслана на адрес' +
                ' электронной почты, привязанный к аккаунту. Вы будете автоматически перенаправленны ' +
                'на страницу входа через',
                aforgot_dialog_done_title: 'Отмена восстановления доступа',
                aforgot_dialog_done_text: 'Вы отменили процедуру восстановления доступа к своему аккаунту.' +
                ' Вы будете автоматически перенаправленны на страницу входа через',
                forgot_title: 'Восстановление доступа',
                forgot_err_title: 'Ошибка восстановления доступа',
                forgot_err_text: 'невозможно окончить процедуру восстановления доступа к аккаунту. ' +
                'Вы будете автоматически перенаправленны на страницу входа через',
                forgot_done_title: 'Новый пароль для аккаунта установлен',
                forgot_done_text: 'данный аккаунт успешно восстановлен. Вы будете автоматически перенаправленны' +
                ' на страницу входа через',
                forgot_password: 'Создайте новый пароль',
                forgot_repassword: 'Повторите пароль',
                forgot_button: 'Восстановить аккаунт',
                feedback: 'Обратная связь: info@itgs24.ru',
            },

            parent_pay: {
                title: 'История платежей',
                alert_overdue_before: 'Внимание! Окончился срок действия оказания услуг. Вы можете',
                alert_overdue_link: 'оплатить услуги',
                alert_overdue_after: ', выбрав один из тарифных планов',
                alert_day_before: 'Внимание! Срок действия лицензии закончился. Вам необходимо',
                alert_day_link: 'оплатить услуги',
                alert_day_after: 'сегодня',
                alert_week_before: 'Внимание! До окончания срока действия лицензии осталось менее недели. ' +
                'Пора подумать о',
                alert_week_link: 'оплате услуг',
                alert_week_after: '',
                link_rates: 'Оплатить',
                dt_field_id: 'Номер счета',
                dt_field_payment: 'Дата оплаты счета',
                dt_field_finish: 'Дата окончания оплаченного периода',
                fail_before: 'Оплата заказа #',
                fail_after: 'не была произведена',
                success_before: 'Оплата заказа #',
                success_after: 'была успешно произведена',
                unsuccess_before: 'Оплата заказа',
                unsuccess_after: 'не была произведена',
                rates_title: 'Выберите тарифный план',
                rates_cy: '₽',
                rates_month: 'месяц',
                number_of_sessions: 'Количество сеансов',
            },

            admin_rate: {
                h1: 'Справочник тарифных планов',
                button: 'Создать тарифный план',
                id: 'ID',
                title: 'Наименование',
                cost: 'Стоимость',
                month_count: 'Количество месяцев',
                type: 'Тип',
                system_type: 'Системный тип',
                module_title: 'Карточка тарифного плана',
                field_title: 'Наименование',
                field_description: 'Описание',
                field_cost: 'Стоимость',
                field_month_count: 'Количество месяцев',
                active: 'Активный',
                archive: 'Архивный',
                trial: 'Триальный',
                video_system_type: 'Видеонаблюдение',
                psychology_system_type: 'Психологическая поддержка',
                services_quantity: 'Кол-во посещений',
            },
            admin_user: {
                h1: 'Справочник пользователей',
                button: 'Регистрация нового пользователя',
                id: 'ID',
                email: 'Email',
                firstname: 'Псевдоним',
                state: 'Статус',
                module_title: 'Карточка пользователя',
                resend: 'Реактивировать',
                block: 'Заблокировать',
                block_notify_title: 'Заблокирован',
                block_notify_text: 'Пользователь заблокирован. Стоимость абоненской платы пересчитана',
                unblock: 'Активировать',
                unblock_notify_title: 'Активирован',
                unblock_notify_text: 'Пользователь активирован. Стоимость абоненской платы пересчитана',
                field_email: 'Email',
                field_contract_number: 'Номер договора',
                field_state: 'Статус',
                field_description: 'Описание',
                fiels_authorities: 'Полномочия',
                fiels_schools: 'Образовательные организации',
                desc_schools: 'Укажите одну или несколько Образовательных Организаций, ' +
                'к которым необходимо предоставить доступ пользователю в качестве родителя.' +
                ' Далее, привяжите родителя к конкретным группам в этой Организации',
                fiels_contractors: 'Управление Организацией',
                desc_contractors: 'Если необходимо назначить пользователя ' +
                'администратором в Образовательной Организации и предоставить ' +
                'ему доступ к управлению пользователями, камерами, расписаниями, ' +
                'группами в этой Образовательной организации, укажите это ниже',
                option_blocked: 'Заблокирован',
                option_active: 'Активен',
                cm_authorities_title: 'Доступные полномочия',
                cm_authorities_description: 'Выберите одно или ' +
                'несколько полномочий, которые необходимо прикрепить к данному пользователю',
                ci_authorities_title: 'Включить полномочия',
                cm_schools_title: 'Выбрать образовательное учреждение',
                cm_schools_description: 'Выберите одно или несколько ' +
                'образовательных учреждений, в которых обучаются дети пользователя',
                ci_schools_title: 'Выбрать школу',
                cm_contractors_title: 'Привязать к контрагенту',
                cm_contractors_description: 'Выберите одного или ' +
                'несколько контрагентов, которые данные пользователь будет администрировать',
                ci_contractors_title: 'Привязать контрагента',
                ci_groups_title: 'Выбрать класс или группу обучающегося',
                cm_groups_title: 'Выбрать группы',
                cm_groups_description: 'Выберите одну или несколько групп,' +
                ' в которых обучаются дети пользователя',
                create_title: 'Пользователь создан',
                create_text: 'Пользователь успешно зарегестрирован. ' +
                'На указанный email было отправлено письмо с дальнейшими инструкциями',
                create_fail: 'Ошибка регистрации',
                resend_title: 'Активация аккаунта',
                resend_text: 'Повторное письмо для активации аккаунта было успешно отправлено',
                resend_fail: 'Ошибка при отправке письма: не удается отправить сообщение',
                resend_fail_u: 'Ошибка при отправке письма: пользователь не найден',
                resend_fail_s: 'Ошибка при отправке письма: учетная запись' +
                ' уже активирована, либо пользователь заблокирован',
                pg_title: 'Наименование группы',
                pg_delete_confirmation: 'Вы уверены, что хотите удалить данную группу?',
                pg_button: 'Добавить группу',
                pg_module_title: 'Группа',
                pg_field_title: 'Наименование',
                pg_notification_update_title: 'Изменения сохранены',
                pg_notification_update_text: 'Группа успешно изменена',
                pg_notification_create_title: 'Группа сохранена',
                pg_notification_create_text: 'Новая группа успешно создана',
                pg_notification_delete_title: 'Группа удалена',
                pg_notification_delete_text: 'Группа была успешна удалена',
                payment_alert_1: 'Последний платеж был совершен',
                payment_alert_2: 'Рассчетная стоимость следующего платежа:',
                payment_alert_3: 'руб.',
                payment_alert_4: 'Оплату необходимо произвести до',
            },
            admin_contractors: {
                h1: 'Справочник Образовательных Организаций',
                button: 'Регистрация новой Образовательной Организации',
                id: 'ID',
                title: 'Наименование',
                type: 'Юридическая форма',
                inn: 'ИНН/КПП',
                address: 'Адрес',
                type_entity: 'Юридическое лицо',
                type_businessman: 'Юридическое лицо',
                type_municipality: 'Муниципальное образование',
                module_title: 'Образовательная организация',
                field_name: 'Полное наименование',
                field_title: 'Наименование',
                field_description: 'Описание',
                field_type: 'Юридическая форма',
                field_inn: 'ИНН',
                field_kpp: 'КПП',
                field_address: 'Адрес',
                field_okpo: 'ОКПО',
                field_ogrn: 'ОГРН',
                field_ogrnip: 'ОГРНИП',
                create_fail: 'Ошибка',
            },
            stub: {
                psychologist_title: 'Психологическая платформа',
                psychologist_description: 'Одной из первых функций' +
                ' является внедрение платформы психологической службы ' +
                '(корректировка поведения, минимизирование конфликтных ' +
                'ситуаций, психологическое сопровождение)',
            },
        },
        psychology: {
            appointments: {
                customer_single_appointment_modal_title: 'Информация о встрече',
                customer_create_appointment_modal_title: 'Создать встречу',
                customer_wizard_specialist_email: 'Email специалиста',
                customer_wizard_date: 'Дата',
                customer_wizard_time: 'Время',
                customer_wizard_specialist_label: 'Специалист',
                customer_wizard_specialist_button: 'Выбрать',
                customer_wizard_client_label: 'Клиент',
                customer_wizard_client_info: 'Пожалуйста, проверьте всю необходимую информацию о встрече ниже',
                customer_show_window_title: 'Записаться на встречу',
                customer_show_add_title: 'Записаться на встречу',
                specialist_modal_add_lesson: 'Назначить время',
                delete_confirmation: 'Вы уверены, что хотите удалить время работы?',
                specialist_show_window_title: 'График занятий',
                dialog_alert_current: 'Занятие идет в настоящий момент. ' +
                'Пожалуйста, нажмите "Начать диалог" или "Начать видеочат", что бы связаться со специалистом',
                dialog_alert_past: 'Это занятие уже закончилось. ' +
                'Что бы связаться со специалистом, необходимо назначить новое занятие',
                dialog_alert_future: 'Занятие еще не началось. Что бы связаться со специалистом, ' +
                'откройте этот диалог в указанные ниже дату и  время',
                psy_dialog_alert_current: 'Занятие идет в настоящий момент. ' +
                'Пожалуйста, нажмите "Начать диалог" или "Начать видеочат", что бы связаться с клиентом',
                psy_dialog_alert_past: 'Это занятие уже закончилось. ' +
                'Что бы связаться с клиентом, необходимо назначить новое занятие',
                psy_rating_alert_past: 'Вы можете оставить свой отзыв о специалисте',
                psy_dialog_alert_future: 'Занятие еще не началось. Что бы связаться с клиентом,' +
                ' откройте этот диалог в указанные ниже дату и  время',
                start_messages: 'Начать диалог',
                save: 'Добавить занятие',
                cancel: 'Закрыть окно',
                create_notification: 'Новая встреча со специалистом - назначена',
                save_comment_button: 'Сохранить отзыв',
                save_comment_notification_title: 'Сохранено',
                save_comment_notification_text: 'Спасибо, Ваш отзыв сохранен',
                comment_placeholder: 'Пожалуйста, напишите Ваш отзыв о специалисте',
                saved_comment_customer: 'Ваш комментарий:',
                saved_comment_specialis: 'Ответ специалиста:',
            },
            history: {
                customer_history_module_title: 'История сеансов',
                specialist_new_appointment_button: 'Новая встреча',
                customer_create_appointment_modal_title: 'Назначить встречу со специалистом',
                specialist_name: 'Email',
                specialist_date: 'Дата',
                specialist_rating: 'Рейтинг',
                modal_psy_specialist_profile_title: 'Профиль специалиста',
            },
            comments: {
                delete_reason: 'Причина удаления',
                response_button: 'Ответить',
                response_modal_title: 'Ответ',
                new_problemule_title: 'Отзывы',
                specialist_answer_title: 'Пожалуйста, прокомментируйте отзыв',
            },
            customer_card: {
                fill_modal_title: 'Заполнить карточку посетителя',
                problem: 'Проблема',
                peculiarities: 'Особенности клиента',
                solution: 'Решение',
                result: 'Результат',
                new_problem: 'Новая проблема',
                append: 'Изменить',
                save_problem: 'Сохранить проблему',
                list_problem: 'Все проблемы (назад)',
                notify_title: 'Сохранено',
                notify_text: 'Информация о клиенте сохранена',
            },
            video_chat: {
                start_video_chat_button: 'Позвонить',
                stop_video_chat_button: 'Завершить',
                call_recipient: 'Звонок',
                caller: 'Звонящий',
                continue: 'Продолжить',
                browser_doesnt_support_video: 'Ваше браузер не поддерживает видеозвонки',
                incoming_call: 'Входящий звонок',
                answer_call: 'Ответить',
                deny_call: 'Отклонить',
                video_chat_alert: 'Видеозвонок ещё не начат. Для того, что бы связаться' +
                ' со специалистом, нажмите на кнопку "Позвонить"',
                psy_video_chat_alert: 'Видеозвонок ещё не начат. ' +
                'Для того, что бы связаться с клиентом, нажмите на кнопку "Позвонить"',
                psy_video_chat_danger: 'Критическая ошибка. Пожалуйста, заново выберите занятие: ',
                psy_video_chat_danger_link: 'выбрать занятие',
                psy_video_chat_pause: 'Ваш собеседник поставил ' +
                'видео-звонок на паузу. Вы сможете продолжить разговор, когда он вернётся',
                psy_video_chat_interlocutor_connect: 'Ваш собеседник ' +
                'ещё не успел войти в чат. Кнопка "Позвонить" появится после того, как собеседник войдет в чат',
                button_pause_title: 'Поставить звонок на паузу',
                video_start_chat: 'Ваш собеседник начал видеозвонок. ' +
                'Для того, что бы начать видеобеседу, нажмите "Ответить"',
                information_h2: 'Информация о видео-встрече',
                calendar_button: 'Календарь',
                review_h2: 'Ваш отзыв о встрече',
                notice_of_five_minutes: 'До конца вашего сеанса осталось 5 минут. Вы хотите продложить?',
                plus_one_hour: '+1 час',
                lesson_not_paid: 'Занятие не оплачено',
                next_customer: 'До конца вашего сеанса осталось 5 минут. Следующий клиент',
                go_calendar: 'Закончить занятие',
            },
            messages: {
                status_0: 'доставлено',
                status_1: 'прочитано',
                message_title: 'Введите текст нового сообщения',
                message_button: 'Отправить',
                message_warning: 'Ошибка при иницализации сеанса занятия. Пожалуйста, выберите занятие снова:',
                message_link: 'выбрать занятие',
                title: 'Диалоги',
                writing: 'Собеседник набирает сообщение ...',
                close: 'Свернуть чат',
                open: 'Открыть чат',
                send: 'Можно отправить сообщение с помощью сочетания Ctrl + Enter',
            },
            specialists: {
                specialists_module_title: 'Специалисты',
                profile_title: 'Профиль специалиста',
                profile_alert_info: 'Пожалуйста, заполните информацию о себе, как о специалисте:' +
                ' начало вашей трудовой деятельности, образование, повышения квалификации. ' +
                'Загрузите дипломы и сертификаты',
                profile_description: 'Информация о специалисте',
                profile_documents: 'Дипломы, сертификаты',
                profile_cansel: 'Отменить изменения',
                profile_save: 'Сохранить информацию',
                modal_title: 'Информация о специалисте',
                modal_cansel: 'Закрыть',
            },
        },
    },
};

const i18n = new VueI18n({
    locale: 'ru',
    messages,
});

export default i18n;
