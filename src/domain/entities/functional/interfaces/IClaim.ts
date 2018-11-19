import ICall from '@/domain/entities/functional/interfaces/ICall';
import IAddress from '@/domain/entities/functional/interfaces/IAddress';
import IProblem from '@/domain/entities/functional/interfaces/IProblem';
import IComment from '@/domain/entities/functional/interfaces/IComment';

export default interface IClaim {
    id: number;
    name: string;            // id из АТС Мегафон
    description: string;     // описание полное
    firstName: string;       // имя заявителя
    middleName: string;      // отчество заявителя
    lastName: string;        // фамилия заявителя
    address: IAddress;       // Адрес заявки
    phone: string;           // телефон заявителя
    email: string;           // email заявителя
    link: string;            // ссылка на аудиозапись заявления
    dispatchStatus: string;  // prepared - для диспетчера, edited - для редактора, dispatched - для супервизора
    status: string;          // created, assigned, executed, rejected
    level: string;           // уровень проблемы: личная или общезначимая
    pid: number | null;      // ид родительской заявки
    problem: IProblem;       // Проблема по заявке
    call: ICall;             // Связанный заявок
    parents: [{}];           // Родительские заявки
    comments: IComment[];    // Комментарии к заявке
    created_at_shortened?: string;
}
