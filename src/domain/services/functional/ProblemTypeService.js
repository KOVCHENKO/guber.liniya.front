class ProblemTypeService {
    static addProblemTypeToTree(ref, text, icon) {
        ref.tree.append({
            text,
            data: {
                icon,
            },
            state: { selected: true },
        });
    }
}
export default ProblemTypeService;
//# sourceMappingURL=ProblemTypeService.js.map