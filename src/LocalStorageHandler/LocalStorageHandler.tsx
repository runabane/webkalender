import CalenderData from "../dataModel/CalenderData";
import TableData from "../dataModel/TableData";
import TimeRangeLogicHandler from "../Logic/TimeRangeLogicHandler";
import DayLogicHandler from "../Logic/DayLogicHandler";
import TableDataLogicHandler from "../Logic/TableDataLogicHandler";
import CalenderDataLogic from "../Logic/CalenderDataLogic";

const getCalenderData = (): CalenderData => {
    let fetchedData: string|null = localStorage.getItem("calenderData");
    if(fetchedData === null) return CalenderDataLogic.generateEmptyCalender();
    return JSON.parse(fetchedData as string)
};

const setCalenderData = (calenderData: CalenderData): void => {
    localStorage.setItem("calenderData", JSON.stringify(calenderData))
};

const deleteNewTableData = (calenderData: CalenderData, tableData: TableData, dayIndex: number): boolean => {
    if(TimeRangeLogicHandler.checkIfTimeExist(tableData.index, calenderData.days[dayIndex].tables)) {
        calenderData.days[dayIndex].tables = calenderData.days[dayIndex].tables.splice(tableData.index, 1);
        setCalenderData(calenderData);
        return true;
    }
    return false;
};

const addNewTableData = (calenderData: CalenderData, tableData: TableData, dayIndex: number): boolean => {
    let targetDay = calenderData.days[dayIndex];
    if(TimeRangeLogicHandler.isTimeValid(tableData.timeRange, targetDay.tables))
    {
        DayLogicHandler.generateIndexForNewTableData(tableData, targetDay);
        targetDay.tables = TableDataLogicHandler.insertAndSortTableData(tableData, targetDay.tables);
        setCalenderData(calenderData);
        return true;
    }
    return false;
};

const updateTableData = (calenderData: CalenderData, tableData: TableData, dayIndex: number) => {
    if(TimeRangeLogicHandler.checkIfTimeExist(tableData.index, calenderData.days[dayIndex].tables)){
        calenderData.days[dayIndex].tables[tableData.index] = tableData;
        setCalenderData(calenderData);
        return true;
    }
    return false;
};

const LocalStorageHandler = {
    addNewTableData: addNewTableData,
    deleteNewTableData: deleteNewTableData,
    updateTableData: updateTableData,
    getCalenderData: getCalenderData
};

export default LocalStorageHandler
