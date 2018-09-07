import IProblem from '@/domain/entities/functional/interfaces/IProblem';
import IAddress from '@/domain/entities/functional/interfaces/IAddress';
import ICall from '@/domain/entities/functional/interfaces/ICall';

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
    public dispatchStatus: string;  // prepared - для диспетчера, edited - для редактора, dispatched - для супервизора
    public pid: number | null;
    public problem: IProblem;       // Проблема по заявке
    public call: ICall;             // Звонок на котором основана заявка


    constructor(id: number, name: string, description: string, firstName: string, middleName: string, lastName: string,
                phone: string, email: string, link: string, dispatchStatus: string, pid: number | null,
                address: IAddress, problem: IProblem, call: ICall) {
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
        this.dispatchStatus = dispatchStatus;
        this.call = call;
    }
}

export default Claim;
