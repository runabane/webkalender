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

const deleteNewTableData = (calenderData: CalenderData, tableDataIndex: number, dayIndex: number): CalenderData|null => {
    if(TimeRangeLogicHandler.checkIfTimeExist(tableDataIndex, calenderData.days[dayIndex].tables)) {
        //console.log("hehe deleting : " + tableDataIndex);
        let temp = calenderData.days[dayIndex].tables.splice(tableDataIndex, 1);
        //console.log("after delete : " + JSON.stringify(calenderData.days[dayIndex].tables) + " tbd index : " + tableDataIndex);
        //console.log("temp : " + JSON.stringify(temp))
        setCalenderData(calenderData);
        return calenderData;
    }
    return null;
};

const addNewTableData = (calenderData: CalenderData, tableData: TableData, dayIndex: number): CalenderData|null => {
    let targetDay = calenderData.days[dayIndex];
    if(TimeRangeLogicHandler.isTimeValid(tableData.timeRange, targetDay.tables))
    {
        DayLogicHandler.generateIndexForNewTableData(tableData, targetDay);
        calenderData.days[dayIndex].tables = TableDataLogicHandler.insertAndSortTableData(tableData, targetDay.tables);
        setCalenderData(calenderData);
        return calenderData;
    }
    return null;
};

const updateTableData = (tableData: TableData, dayIndex: number) => {
    let calenderData = getCalenderData();
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
