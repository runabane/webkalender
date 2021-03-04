import React from 'react';
import TableData from "../dataModel/TableData";
import {CardHeader, Typography, Card, CardContent, withStyles, IconButton, Tooltip} from "@material-ui/core";
import TimeConverter from "../Logic/TimeConverter";

const Timetable = (tableData: TableData) => {

    const DataContainer: any = withStyles({
        root:{
        display: "flex",
        flexDirection: "column",
        backgroundColor: tableData.color,
        padding: 5}
    })(CardContent);

    const StyledCardHeader = withStyles({
        root:{
            backgroundColor: tableData.color,
        }
    })(CardHeader);

    const StyledCard: any = withStyles({
        root:{
           margin: 5
        }
    })(Card);

    return(
        <StyledCard>
            <StyledCardHeader
                title ={tableData.title}
                subheader= {TimeConverter.TimeConverter(tableData.timeRange.timeFrom, tableData.timeRange.timeTo)}
            />
            <DataContainer>
                    <Typography variant="subtitle1">
                        {tableData.activity}
                    </Typography>
                    <Typography variant="subtitle1">
                        {tableData.place}
                    </Typography>
            </DataContainer>
        </StyledCard>
    )
};


export default  Timetable
