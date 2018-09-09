class CallService {
    static resolveCallProcessingStatus(calls) {
        return calls.map((b) => {
            switch (b.processing_status) {
                case 'raw':
                    b.processing_status = 'Необработанный';
                    break;
                case 'claimed':
                    b.processing_status = 'Заявка';
                    break;
                case 'reclaimed':
                    b.processing_status = 'Повторная';
                    break;
                case 'failed':
                    b.processing_status = 'Ошибочная';
                    break;
            }
            return b;
        });
    }
}
export default CallService;
//# sourceMappingURL=CallService.js.map