import moment from 'moment';
class TimeFormatter {
    static formatTime(timeField) {
        return moment(timeField).format('D.MM.YY / HH:mm');
    }
}
export default TimeFormatter;
//# sourceMappingURL=TimeFormatter.js.map