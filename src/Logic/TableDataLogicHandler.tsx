import TableData from "../dataModel/TableData";
import TimeRangeLogicHandler from "./TimeRangeLogicHandler";

const insertAndSortTableData = (toBeInserted: TableData, tables: TableData[]): TableData[] => {
    let sortedTable = [];
    for(let i = 0; i < sortedTable.length; i++){
        if(TimeRangeLogicHandler.compareTimeRange(toBeInserted.timeRange, tables[i].timeRange) > 0){
            sortedTable.push(tables[i]);
        } else {
            sortedTable.push(toBeInserted)
            let splicedTables = tables.splice(0, i);
            sortedTable.concat(splicedTables);
            break;
        }
        if(i === sortedTable.length - 1) sortedTable.push(tables[i])
    }
    return sortedTable;
};


const TableDataLogicHandler = {
    insertAndSortTableData: insertAndSortTableData
};

export default TableDataLogicHandler
