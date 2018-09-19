import User from '@/domain/entities/common/interfaces/User';
import IRole from '@/domain/entities/common/interfaces/IRole';

export default interface UserState {
    user: User;         // Пользователь
    token: string;      // Токен для проверки возможности обращения к определенным маршрутам
    users: [{}];        // Перечень пользователей
    role: IRole;        // Роль - для определения возможности входа на определенные маршруты
    nickname: string;   // Псевдоним пользователя
}
