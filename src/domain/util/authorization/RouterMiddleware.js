import { tokenCheck } from '@/domain/util/authorization/CheckTokenAvailability';
import { getRole } from '@/domain/util/authorization/RoleChecker';
// TODO: Передать нормальные типы пользователей
/**
 * Проверка на то, залогинен пользователь или нет
 * @param router
 */
export const authMiddleware = (router) => {
    router.beforeEach((to, from, next) => {
        if (to.matched.some((record) => record.meta.requiresAuth)) {
            if (!tokenCheck()) {
                next({
                    path: '/',
                });
            }
            else {
                next();
            }
        }
        else {
            next(); // всегда так или иначе нужно вызвать next()!
        }
    });
};
/**
 * Проверка на доступность роли пользователя
 * @param router
 */
export const roleMiddleware = (router) => {
    router.beforeEach((to, from, next) => {
        if (to.matched.some((record) => record.meta.requiresRole)) {
            if (getRole() !== to.meta.requiresRole) {
                next({
                    path: '/',
                });
            }
            else {
                next();
            }
        }
        else {
            next(); // всегда так или иначе нужно вызвать next()!
        }
    });
};
//# sourceMappingURL=RouterMiddleware.js.map