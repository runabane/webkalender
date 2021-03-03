import React from 'react';
import WeekContainer from "./WeekContainer";
import ColorPalettes from "../dataModel/ColorPalettes";
import {Typography, withStyles} from "@material-ui/core";

/**
 * Main Container that contains all Component
 * @constructor
 */
const MainContainer = (props: any) => {
    return(
        <div style={MCStyle.containerStyle}>
            <TitleText variant="h1">
                Meiner Zeitplan
            </TitleText>
            <WeekContainer/>
        </div>
    )
}

const MCStyle: any = {
    containerStyle:{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        backgroundColor: ColorPalettes.BackgroundColorPalettes.metallicBlack,
        alignSelf: "flex-start",
        justifyContent: "flex-start"
    }
}

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
