interface IProblem {
    id: number;
    name: string;
    description: string;
    problem_type_id?: number; // тип проблемы
}

export default IProblem;
