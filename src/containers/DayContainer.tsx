import React, {useState} from 'react';
import {Typography, withStyles} from "@material-ui/core";
import Day from "../dataModel/Day";
import Timetable from "./Timetable";
import DayLogicHandler from "../Logic/DayLogicHandler";
import ColorPalettes from "../dataModel/ColorPalettes";

const DayContainer = (day: Day) => {
    const [tables, setTables] = useState(day.tables);
    return(
        <div style={DayContainerStyle.placeholderStyle}>
                <StyledText>
                    {DayLogicHandler.fetchDay(day.index)}
                </StyledText>
                {tables.map((table, index)  =>
                            <Timetable key={index} index={table.index} timeRange={table.timeRange} title={table.title}
                                      place={table.place} color={table.color} tag={table.tag} activity={table.activity} dayIndex={day.index}/>
                )}
        </div>
    )
};

const DayContainerStyle: any = {
    placeholderStyle:{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: 5,
        margin: 5,
        borderRadius: 6,
        backgroundColor: ColorPalettes.BackgroundColorPalettes.moreDarkerBlack,
        width: "100%"
    }
}

const StyledText = withStyles({
    root: {
        fontSize: 25,
        fontWeight: 400,
        color: "white",
        marginBottom: 5,
    }
})(Typography);

export default DayContainer
