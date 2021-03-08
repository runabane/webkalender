import React, {createContext, useEffect, useState} from 'react';
import WeekContainer from "./WeekContainer";
import ColorPalettes from "../dataModel/ColorPalettes";
import {Button, Tooltip, Fab, Grid, Typography, withStyles, Backdrop, CircularProgress} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import AddModal from './modalcontiner/AddModal';
import calenderData from "../mockData/MockData";
import LocalStorageHandler from "../LocalStorageHandler/LocalStorageHandler";
import CalenderData from "../dataModel/CalenderData";
import CalenderDataLogic from "../Logic/CalenderDataLogic";

export const DeleteContext = createContext({openDelete: false, handleDelete: (a: number, b: number) => null});

/**
 * Main Container that contains all Component
 * @constructor
 */
const MainContainer = (props: any) => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const[loading, setLoading] = useState(false);
    const [calenderDataStorage, setCalenderDataStorage] = useState<CalenderData>(CalenderDataLogic.generateEmptyCalender());

    useEffect(() => {
        let fetchedData = LocalStorageHandler.getCalenderData();
        //console.log("CALENDERDATA: " + JSON.stringify(LocalStorageHandler.getCalenderData()));
        //console.log("loading : " + loading);
        //console.log("MOCK :  " + JSON.stringify(calenderDataStorage));
        setCalenderDataStorage(fetchedData);
        setLoading(!loading);
        //console.log("CALENDERDATASTORAGE: " + JSON.stringify(calenderDataStorage));
    }, []);

    const handleSetCalenderDataStorage = (calenderData: CalenderData) => {
        setCalenderDataStorage(calenderData);
        handleSetLoading();
    };

    const handleSetLoading = () => {
        setLoading(!loading)
    };

    const handleToggleDeleteWindow = () => {
        setOpenDelete(!openDelete);
    };

    const handleDelete = (dayIndex: number, tableIndex: number) => {
        let isSuccessful = LocalStorageHandler.deleteNewTableData(calenderDataStorage, tableIndex, dayIndex);
        if(isSuccessful !== null){
            handleSetCalenderDataStorage(isSuccessful)
            let isEmpty = isSuccessful.days.filter(day => day.tables.length > 0);
            if(isEmpty.length === 0) setOpenDelete(false)
        }
        return null;
    };

    const handleClose = () => {
        setOpenAdd(false)
    };
    const handleOpen = () => {
        setOpenAdd(true)
    };

    return(
        <MCStyle>
            <TitleText variant="h1">
                Meiner Zeitplan
            </TitleText>
            <DeleteContext.Provider value={{openDelete: openDelete, handleDelete: handleDelete}}>
                <WeekContainer key={`week-container-loading:${loading}`} days={calenderDataStorage?.days}/>
            </DeleteContext.Provider>

            <ButtonContainer>
                <Tooltip title={"Add New Schedule"} aria-label={"add-table"}>
                <StickyAddButton onClick={handleOpen}
                                 size="large"
                                 color="inherit"
                                 aria-label="add">
                    <AddIcon style={{fontSize: 35}}/>
                </StickyAddButton>
            </Tooltip>
                <Tooltip title={"Delete Schedule"} aria-label={"add-table"}>
                    <StickyAddButton onClick={handleToggleDeleteWindow}
                                     size="large"
                                     color="inherit"
                                     aria-label="delete">
                        <DeleteIcon style={{fontSize: 35}}/>
                    </StickyAddButton>
                </Tooltip>
            </ButtonContainer>
            <AddModal open={openAdd} handleClose={handleClose} calenderData={calenderDataStorage} calenderDataCallback={handleSetCalenderDataStorage}/>
        </MCStyle>
    )
};

const MCStyle: any = withStyles({
    root:{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        backgroundColor: ColorPalettes.BackgroundColorPalettes.metallicBlack,
        alignSelf: "flex-start",
        justifyContent: "flex-start"
    }
})(Grid);

const StickyAddButton: any = withStyles({
    root:{
        width: 75,
        height: 75,
        margin: 65,
        marginLeft: 0,
        background: `linear-gradient(135deg, ${ColorPalettes.BackgroundColorPalettes.darkerMetallicBlack} 30%, ${ColorPalettes.BackgroundColorPalettes.moreDarkerBlack} 60%)`,
        color: 'white',
        boxShadow: `2px 3px 3px 1px ${ColorPalettes.BackgroundColorPalettes.vampireBlack};`
    }
})(Fab);

const ButtonContainer: any = withStyles({
    root: {
        display: "flex",
        position: "fixed",
        bottom: 0,
        right: 0,
        justifyContent: "flex-end",
    }
})(Grid);

const TitleText = withStyles({
    root:{
        fontSize: 43,
        margin: 25,
        marginBottom: 20,
        color: "white",
        fontWeight: 500,
        letterSpacing: 2
    }
})(Typography);


export default MainContainer
