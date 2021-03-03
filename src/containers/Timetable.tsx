import React from 'react';
import TableData from "../dataModel/TableData";
import {Grid, Typography} from "@material-ui/core";
import TimeConverter from "../Logic/TimeConverter";

const Timetable = (tableData: TableData) => {

    const dataContainer: any = {
        display: "flex",
        flexDirection: "column",
        backgroundColor: tableData.color,
        borderRadius: 6,
        margin: 5,
        padding: 5,
    };

    return(
        <Grid>
            <div style={dataContainer}>
                <Grid>
                    <Typography variant="h6">
                        {tableData.title}
                    </Typography>
                </Grid>
                <Grid>
                    <Typography variant="subtitle1">
                        {tableData.activity}
                    </Typography>
                </Grid>
                <Grid>
                    <Typography variant="subtitle1">
                        {tableData.place}
                    </Typography>
                </Grid>
                    <Typography variant="subtitle2">
                        {TimeConverter(tableData.timeRange.timeFrom, tableData.timeRange.timeTo)}
                    </Typography>
                <Grid>

                </Grid>
            </div>
        </Grid>
    )
}


export default  Timetable
