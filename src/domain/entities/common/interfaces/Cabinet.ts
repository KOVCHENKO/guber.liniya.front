/**
 * id - ид кабинета
 * name - название
 * icon - url иконки кабинета
 * route - название маршрута для перехода по ссылке в кабинет
 */
interface Cabinet {
    id: number;
    name: string;
    icon: string;
    route: string;
}

export default Cabinet;
