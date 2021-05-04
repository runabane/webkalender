import React, {useContext, useState} from 'react';
import TableData from "../dataModel/TableData";
import {
    CardHeader,
    Typography,
    Card,
    CardContent,
    withStyles,
    IconButton,
    Tooltip,
    Fab,
    Button,
    Box
} from "@material-ui/core";
import TimeConverter from "../Logic/TimeConverter";
import {TimetableContext} from "./MainContainer";
import CloseIcon from '@material-ui/icons/Close';
import StatusModal from "./modalcontainer/StatusModal";

const Timetable = (tableData: any) => {

    const contextHandler = useContext(TimetableContext);
    const [open, handleOpen] = useState(false);

    console.log("contextHandler : " + JSON.stringify(contextHandler));

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
        return contextHandler.openDelete ? 'visible' : 'hidden'
    };

    const handleDeleteOnClick = () => {
        console.log("DELETING");
        contextHandler.handleDelete(tableData.dayIndex, tableData.index)
    };

    const handleCloseModal = () => {
        handleOpen(false);
    };

    const handleOpenModal = () => {
        handleOpen(true);
    };

    const StyledFab: any = withStyles({
        root:{
            visibility: setVisibility()
        }
    })(Fab);

    const StyledButton: any = withStyles({
        root:{

        }
    })(Button);

    return(
        <Box>
                <StyledButton
                onClick = {handleOpenModal}
            >
            <StyledCard>
                <StyledCardHeader
                    title ={tableData.title}
                    subheader= {TimeConverter.TimeConverter(tableData.timeRange.timeFrom, tableData.timeRange.timeTo)}
                    action={
                        <StyledFab size="small" color="secondary" onClick={handleDeleteOnClick}>
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
            </StyledButton>
            <StatusModal open={open} handleClose={handleCloseModal} calenderData={contextHandler.calenderData} calenderDataCallback={contextHandler.handleSetCalenderData} tableData={tableData} dayIndex={tableData.dayIndex}/>
        </Box>
    )
};


export default  Timetable
