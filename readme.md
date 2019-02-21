Установка:
1. git clone --branch dev http://git.dev-io.ru:3031/ilkov/guber.liniya.front.git
2. npm install
3. в файле src/globals.ts установить переменные: baseUrl, baseRootUrl

Запуск:
npm run serve
tsc -w

Пользователи:
specialist_a@mail.ru admin (роль специалист)
dispatcher@dispatcher.ru admin (роль диспетчер)

Примечание: Пользователя брать из таблицы users. Пароль всех пользователь - admin

Развертывание:
1. npm run build
2. git add dist && git commit -m "Build date"
4. git push origin :production && git subtree push --prefix dist origin production
5. git reset --hard origin/production
