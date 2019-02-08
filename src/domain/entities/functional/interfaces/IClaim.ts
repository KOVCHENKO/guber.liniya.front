import ICall from '@/domain/entities/functional/interfaces/ICall';
import IAddress from '@/domain/entities/functional/interfaces/IAddress';
import IProblem from '@/domain/entities/functional/interfaces/IProblem';
import IComment from '@/domain/entities/functional/interfaces/IComment';
import IApplicant from '@/domain/entities/functional/interfaces/IApplicant';

export default interface IClaim {
    id: number;
    name: string;                   // id из АТС Мегафон
    description: string;            // описание полное
    address?: IAddress;              // Адрес заявки
    phone: string;                  // телефон заявителя
    link: string;                   // ссылка на аудиозапись заявления
    dispatchStatus: string;         // prepared - для диспетчера, edited - для редактора, dispatched - для супервизора
    dispatch_status?: string;        // dispatchStatus - необрабовтанный
    status: string;                 // created, assigned, executed, rejected
    level: string;                  // уровень проблемы: личная или общезначимая
    pid: number | null;             // ид родительской заявки
    problem: IProblem;              // Проблема по заявке
    call: ICall;                    // Связанный звонок
    parents: [{}];                  // Родительские заявки
    comments: IComment[];           // Комментарии к заявке
    applicant?: IApplicant;          // Заявитель заявки
    created_at_shortened?: string;  // Дата создания: в формате D.MM.YY / HH:mm
    created_at: string;             // Дата создания с сервера
}
