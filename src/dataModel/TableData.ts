import Tag from "./Tag";
import TimeRange from "./TimeRange";

export default interface TableData{
    index: number;
    timeRange: TimeRange;
    title: string;
    activity?: string;
    place?: string;
    color: string;
    tag?: Tag[];
}
