import TableData from "../dataModel/TableData";
import TimeRangeLogicHandler from "./TimeRangeLogicHandler";

const insertAndSortTableData = (toBeInserted: TableData, tables: TableData[]): TableData[] => {
    let sortedTable = [];
    if(tables.length === 0) sortedTable.push(toBeInserted);
    for(let i = 0; i < tables.length; i++){
        if(TimeRangeLogicHandler.compareTimeRange(toBeInserted.timeRange, tables[i].timeRange) > 0){
            console.log("not else i : " + i);
            sortedTable.push(tables[i]);
        } else {
            sortedTable.push(toBeInserted);
            let splicedTables = tables.splice(0, i);
            sortedTable = sortedTable.concat(tables);
            break;
        }
        if(i === tables.length - 1) sortedTable.push(toBeInserted)
    }
    return sortedTable;
};


const TableDataLogicHandler = {
    insertAndSortTableData: insertAndSortTableData
};

export default TableDataLogicHandler
