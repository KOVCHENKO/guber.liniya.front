import Dispatcher from '@/domain/services/functional/roles/Dispatcher';
import Editor from '@/domain/services/functional/roles/Editor';
import Supervisor from '@/domain/services/functional/roles/Supervisor';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
export class RoleResolver {
    static resolveRole(role) {
        try {
            for (const singleRole of this.roleBunch) {
                if (singleRole.type === role) {
                    return singleRole;
                }
            }
        }
        catch {
            ErrorNotifier.notifyWithCustomMessage('Роль пользователя не определена');
        }
    }
}
RoleResolver.roleBunch = [
    new Dispatcher(),
    new Editor(),
    new Supervisor(),
];
export default RoleResolver;
//# sourceMappingURL=RoleResolver.js.map