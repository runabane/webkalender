import React, {useState} from 'react';
import MockData from "../mockData/MockData";
import DayContainer from "./DayContainer";
import Day from "../dataModel/Day";
import ColorPalettes from "../dataModel/ColorPalettes";
import CalenderData from "../dataModel/CalenderData";

const WeekContainer = (props: CalenderData) => {
    let days = props.days;
    return (
        <div style={containerStyle.weekContainerStyle}>
            {days.map((day, index) =>
                  <DayContainer key={index} tables={day.tables} index={day.index}/>
            )}
        </div>
    )
};

const containerStyle: any = {
    weekContainerStyle: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: ColorPalettes.BackgroundColorPalettes.darkerMetallicBlack,
        borderRadius: 3,
        padding: 10,
        width: "80%",
        height: "80%",
        minHeight: 500,
        minWidth: 1000,
        maxWidth: 2000,
        alignSelf: "center",
        justifyContent: "center",
        margin: 10,
    }
};


export default WeekContainer
