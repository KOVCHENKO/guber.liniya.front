/**
 * id - ид кабинета
 * name - название
 * icon - url иконки кабинета
 * modules - модули (вместе с url фронт-энда)
 */
interface Cabinet {
    id: number;
    name: string;
    icon: string;
    modules: Module[];
}

export default Cabinet;
