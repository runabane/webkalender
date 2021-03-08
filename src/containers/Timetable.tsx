import React, {useContext} from 'react';
import TableData from "../dataModel/TableData";
import {CardHeader, Typography, Card, CardContent, withStyles, IconButton, Tooltip, Fab} from "@material-ui/core";
import TimeConverter from "../Logic/TimeConverter";
import {DeleteContext} from "./MainContainer";
import CloseIcon from '@material-ui/icons/Close';

const Timetable = (tableData: any) => {

    const deleteHandler = useContext(DeleteContext);

    console.log("deleteHandler : " + JSON.stringify(deleteHandler));

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
        },
        action:{
            position: 'absolute',
            right: "10%",
            zIndex: 10
        }
    })(CardHeader);

    const StyledCard: any = withStyles({
        root:{
           margin: 5
        }
    })(Card);

    const setVisibility = () => {
        return deleteHandler.openDelete ? 'visible' : 'hidden'
    };

    const handleDeleteOnClick = () => {
        console.log("DELETING");
        deleteHandler.handleDelete(tableData.dayIndex, tableData.index)
    };

    // @ts-ignore
    const StyledFab: any = withStyles({
        root:{
            visibility: setVisibility()
        }
    })(Fab);

    return(
        <StyledCard>
            <StyledCardHeader
                title ={tableData.title}
                subheader= {TimeConverter.TimeConverter(tableData.timeRange.timeFrom, tableData.timeRange.timeTo)}
                action={
                    <StyledFab size="small" color="secondary" onClick={handleDeleteOnClick}> {/*onClick={deleteHandler.handleDelete(tableData.dayIndex, tableData.index)}>*/}
                        <CloseIcon />
                    </StyledFab>
                }
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
