import User from '@/domain/entities/common/User';
class Specialist extends User {
    constructor(id, email, password, organization) {
        super(id, email, password);
        this.id = id;
        this.organization = organization;
    }
}
export default Specialist;
//# sourceMappingURL=Specialist.js.map