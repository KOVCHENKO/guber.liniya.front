import moment from 'moment';

class TimeFormatter {
    public static formatTime(timeField: string): string {
        return moment(timeField).format('D.MM.YY / HH:mm');
    }
}

export default TimeFormatter;

