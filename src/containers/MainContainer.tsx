import React, {useState} from 'react';
import WeekContainer from "./WeekContainer";
import ColorPalettes from "../dataModel/ColorPalettes";
import {Button, Tooltip, Fab, Grid, Typography, withStyles} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import AddModal from './modalcontiner/AddModal';

/**
 * Main Container that contains all Component
 * @constructor
 */
const MainContainer = (props: any) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
    };
    const handleOpen = () => {
        setOpen(true)
    };

    return(
        <MCStyle>
            <TitleText variant="h1">
                Meiner Zeitplan
            </TitleText>
            <WeekContainer/>
            <ButtonContainer>
                <Tooltip title={"Add New Schedule"} aria-label={"add-table"}>
                    <StickyAddButton onClick={handleOpen}
                                     size="large"
                                     color="inherit"
                                     aria-label="add">
                        <AddIcon style={{fontSize: 35}}/>
                    </StickyAddButton>
                </Tooltip>
            </ButtonContainer>
            <AddModal open={open} handleClose={handleClose} />
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
        margin: 55,
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
