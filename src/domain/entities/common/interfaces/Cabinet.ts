/**
 * id - ид кабинета
 * name - название
 * icon - url иконки кабинета
 */
interface Cabinet {
    id: number;
    name: string;
    icon: string;
    route: string;
}

export default Cabinet;
