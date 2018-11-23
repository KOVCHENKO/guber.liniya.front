import moment from 'moment';

class TimeFormatter {
    public static formatTime(timeField) {
        return moment(timeField).format('D.MM.YY / HH:mm');
    }
}

export default TimeFormatter;

