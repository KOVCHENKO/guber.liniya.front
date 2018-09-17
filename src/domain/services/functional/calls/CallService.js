import TimeFormatter from '@/domain/util/formatters/TimeFormatter';
class CallService {
    static resolveCallProcessingStatus(calls) {
        return calls.map((b) => {
            switch (b.processing_status) {
                case 'raw':
                    b.processing_status = 'Необработанная';
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
    static changeTimeFormat(calls) {
        return calls.map((call) => {
            call.created_at = TimeFormatter.formatTime(call.created_at);
            return call;
        });
    }
}
export default CallService;
//# sourceMappingURL=CallService.js.map