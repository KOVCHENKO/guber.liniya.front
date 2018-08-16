import Cabinet from '../../entities/common/interfaces/Cabinet';

class CabinetCollection {
    public cabinets!: Cabinet[];

    constructor(cabinets: Cabinet[]) {
        this.cabinets = cabinets;
    }
}

export default CabinetCollection;
