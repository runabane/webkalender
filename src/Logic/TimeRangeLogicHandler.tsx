import TimeRange from "../dataModel/TimeRange";
import TableData from "../dataModel/TableData";
import TimeLogicHandler from "./TimeLogicHandler";

let TLH = TimeLogicHandler;

const isTimeValid = (this_TimeRange: TimeRange, tables: TableData[]) => {
    if(!checkToFromValidity(this_TimeRange)) return false;
    if(tables.length === 0) return true;
    let tableDataRest = tables.filter(table => !checkIntersection(this_TimeRange, table.timeRange)).length
    return tableDataRest === 0
};

const checkIfTimeExist = (this_TimeRange_index: Number, tables: TableData[]) => {
    if(tables.length === 0) return false;
    let filteredTableLength = tables.map(table => table.index === this_TimeRange_index).length;
    return  filteredTableLength !== 0
};

const checkToFromValidity = (timeRange: TimeRange) => {
    return TLH.compareTime(timeRange.timeFrom, timeRange.timeTo) < 0
};

const checkIntersection = (this_TimeRange: TimeRange, that_TimeRange: TimeRange) => {
    let this_Time_Second = [this_TimeRange.timeFrom, this_TimeRange.timeTo].map(time => TLH.getTimeInSecond(time));
    let that_Time_Second = [that_TimeRange.timeFrom, that_TimeRange.timeTo].map(time => TLH.getTimeInSecond(time));
    return this_Time_Second[1] <= that_Time_Second[0] || this_Time_Second[0] >= that_Time_Second[1]
};

const compareTimeRange = (this_TimeRange: TimeRange, that_TimeRange: TimeRange) => {
    let this_Time_Second = [this_TimeRange.timeFrom, this_TimeRange.timeTo].map(time => TLH.getTimeInSecond(time));
    let that_Time_Second = [that_TimeRange.timeFrom, that_TimeRange.timeTo].map(time => TLH.getTimeInSecond(time));
    if(this_Time_Second[1] <= that_Time_Second[0] ) {
        return -1
    } else if (this_Time_Second[0] >= that_Time_Second[1]){
        return 1
    }
    return 0;
};

const TimeRangeLogicHandler = {
    isTimeValid: isTimeValid,
    checkIfTimeExist: checkIfTimeExist
};

export default TimeRangeLogicHandler
