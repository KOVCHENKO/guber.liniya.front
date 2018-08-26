class ProblemTypeService {
    public static addProblemTypeToTree(ref, id, text, icon, type) {
        ref.tree.append({
            id,
            text,
            data: {
                icon,
                type,
            },
            state: { selected: true },
        });
    }
}

export default ProblemTypeService;
