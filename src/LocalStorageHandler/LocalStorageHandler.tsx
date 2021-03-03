import CalenderData from "../dataModel/CalenderData";
import TableData from "../dataModel/TableData";
import TimeRangeLogicHandler from "../Logic/TimeRangeLogicHandler";
import calenderData from "../mockData/MockData";

const getCalenderData = (): CalenderData => {
    return JSON.parse(localStorage.getItem("calenderData") as string)
};

const setCalenderData = (calenderData: CalenderData): void => {
    localStorage.setItem("calenderData", JSON.stringify(calenderData))
};

const deleteNewTableData = (calenderData: CalenderData, tableData: TableData, dayIndex: number) => {
    if(TimeRangeLogicHandler.checkIfTimeExist(tableData.index, calenderData.days[dayIndex].tables)) {
        calenderData.days[dayIndex].tables = calenderData.days[dayIndex].tables.splice(tableData.index, 1)
        setCalenderData(calenderData)
    }
};

const addNewTableData = (calenderData: CalenderData, tableData: TableData, dayIndex: number) => {
    if(TimeRangeLogicHandler.isTimeValid(tableData.timeRange, calenderData.days[dayIndex].tables))
    {
        calenderData.days[dayIndex].tables.push(tableData);
        setCalenderData(calenderData);
        return true;
    }
    return false;
};

const LocalStorageHandler = {
    addNewTableData: addNewTableData,

};

export default LocalStorageHandler
