import {tokenCheck} from '@/domain/util/authorization/CheckTokenAvailability';
import {getRole} from '@/domain/util/authorization/RoleChecker';

// TODO: Передать нормальные типы пользователей

/**
 * Проверка на то, залогинен пользователь или нет
 * @param router
 */
export const authMiddleware = (router: any) => {
    router.beforeEach((to: any, from: any, next: any) => {
        if (to.matched.some((record: any) => record.meta.requiresAuth)) {
            if (!tokenCheck()) {
                next({
                    path: '/',
                });
            } else {
                next();
            }
        } else {
            next(); // всегда так или иначе нужно вызвать next()!
        }
    });
};

/**
 * Проверка на доступность роли пользователя
 * @param router
 */
export const roleMiddleware = (router: any) => {
    router.beforeEach((to: any, from: any, next: any) => {
        if (to.matched.some((record: any) => record.meta.requiresRole)) {
            if (getRole() !== to.meta.requiresRole) {
                next({
                    path: '/',
                });
            } else {
                next();
            }
        } else {
            next(); // всегда так или иначе нужно вызвать next()!
        }
    });
};
