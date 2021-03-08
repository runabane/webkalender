import DayList from "../dataModel/DayList";
import ColorPalettes from "../dataModel/ColorPalettes";
import TableData from "../dataModel/TableData";
import Day from "../dataModel/Day";

const fetchDay = (dayInNumber: number) => {
    let result = "";
    switch(dayInNumber){
        case 0: result = DayList.Montag; break;
        case 1: result = DayList.Dienstag; break;
        case 2: result = DayList.Mittwoch; break;
        case 3: result = DayList.Donnerstag; break;
        case 4: result = DayList.Freitag; break;
        case 5: result = DayList.Samstag; break;
        case 6: result = DayList.Sonntag; break;
    }

    return result;
};

const colorRandomizer = () => {
    let enumArray = Object.values(ColorPalettes.ComponentColorPalettes);
    let random = Math.ceil((Math.random() * 10)) % enumArray.length;
    //console.log("enum color : " + random );
    return enumArray[random] as string
};

const generateIndexForNewTableData = (toBeGenerated: TableData, day: Day) => {
    if(day.tables.length === 0) {
        toBeGenerated.index = 0;
        //console.log("idx if length 0 : " + toBeGenerated.index);
        return
    }
    toBeGenerated.index = day.tables[day.tables.length - 1].index + 1;
    //console.log("idx : " + toBeGenerated.index);
};

const generateEmptyWeek= () : Day[] => {
    let newWeek = [];
    for(let i = 0; i < 7; i++){
        newWeek.push({
            index: i,
            tables: []
        })
    }
    return newWeek;
};

const DayLogicHandler = {
    fetchDay: fetchDay,
    colorRandomizer: colorRandomizer,
    generateIndexForNewTableData: generateIndexForNewTableData,
    generateEmptyWeek: generateEmptyWeek
};

export default DayLogicHandler
