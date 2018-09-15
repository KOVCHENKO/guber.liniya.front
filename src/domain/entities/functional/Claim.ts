import IProblem from '@/domain/entities/functional/interfaces/IProblem';
import IAddress from '@/domain/entities/functional/interfaces/IAddress';
import ICall from '@/domain/entities/functional/interfaces/ICall';
import IComment from '@/domain/entities/functional/interfaces/IComment';

class Claim {
    public id: number;
    public name: string;            // id из АТС Мегафон
    public description: string;     // описание полное
    public firstName: string;       // имя заявителя
    public middleName: string;      // отчество заявителя
    public lastName: string;        // фамилия заявителя
    public address: IAddress;       // Адрес заявки
    public phone: string;           // телефон заявителя
    public email: string;           // email заявителя
    public link: string;            // ссылка на аудиозапись заявления
    public status: string;
    public dispatchStatus: string;  // prepared - для диспетчера, edited - для редактора, dispatched - для супервизора
    public pid: number | null;
    public problem: IProblem;       // Проблема по заявке
    public call: ICall;             // Звонок на котором основана заявка
    public parents: [{}];
    public comments: IComment[];


    constructor(id: number, name: string, description: string, firstName: string, middleName: string, lastName: string,
                phone: string, email: string, link: string, status: string, dispatchStatus: string, pid: number | null,
                parents: [{}], comments: IComment[], address: IAddress, problem: IProblem, call: ICall) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.problem = problem;
        this.link = link;
        this.pid = pid;
        this.parents = parents;
        this.status = status;
        this.dispatchStatus = dispatchStatus;
        this.call = call;
        this.comments = comments;
    }
}

export default Claim;
