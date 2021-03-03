import DayList from "../dataModel/DayList";
import ColorPalettes from "../dataModel/ColorPalettes";

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
    console.log("enum color : " + random );
    return enumArray[random]
};

const DayLogicHandler = {
    fetchDay: fetchDay,
    colorRandomizer: colorRandomizer
};

export default DayLogicHandler
