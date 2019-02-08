import ICall from '@/domain/entities/functional/interfaces/ICall';
import TimeFormatter from '@/domain/util/formatters/TimeFormatter';

class CallService {
    public static resolveCallProcessingStatus(calls: [{}]) {

        return calls.map( (b: any) => {
            switch (b.processing_status) {
                case 'raw':  b.processing_status = 'Необработанная'; break;
                case 'claimed':  b.processing_status = 'Заявка'; break;
                case 'reclaimed':  b.processing_status = 'Повторная'; break;
                case 'failed':  b.processing_status = 'Ошибочная'; break;
            }
            return b;
        });

    }

    public static changeTimeFormat(calls: ICall[] | any) {
        return calls.map((call: any) => {
            call.created_at = TimeFormatter.formatTime(call.created_at);
            return call;
        });
    }
}

export default CallService;
