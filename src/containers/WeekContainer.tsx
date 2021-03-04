import React from 'react';
import MockData from "../mockData/MockData";
import DayContainer from "./DayContainer";
import Day from "../dataModel/Day";
import ColorPalettes from "../dataModel/ColorPalettes";

const WeekContainer = (props: any) => {
    let days: Day[] = MockData.days;
    return (
        <div style={containerStyle.weekContainerStyle}>
            {days.map(day =>
                <DayContainer tables={day.tables} index={day.index}/>
            )}
        </div>
    )
}

const containerStyle: any = {
    weekContainerStyle: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: ColorPalettes.BackgroundColorPalettes.darkerMetallicBlack,
        borderRadius: 3,
        padding: 10,
        width: "80%",
        height: "60%",
        minHeight: 500,
        minWidth: 1000,
        maxWidth: 2000,
        alignSelf: "center",
        justifyContent: "center",
        margin: 10,
    }
}


export default WeekContainer
