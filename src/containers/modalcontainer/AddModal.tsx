import React, {useCallback, useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    TextField,
    withStyles,
    Input, Select, MenuItem, InputLabel, FormControl, Grid,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, TimePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import enLocale from "date-fns/locale/en-US";
import DayLogicHandler from '../../Logic/DayLogicHandler';
import Day from '../../dataModel/Day';
import LocalStorageHandler from "../../LocalStorageHandler/LocalStorageHandler";

const AddModal = (props: any) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState<string>("");
    const [place, setPlace] = useState<string>();
    const [day, setDay] = useState<number>();
    const [timeFrom, setTimeFrom] = useState<Date|null>(new Date());
    const [timeTo, setTimeTo] = useState<Date|null>(new Date());

    const handleSetTimeFrom = (date: Date|null) => {
        setTimeFrom(date);
    };

    const handleSetTimeTo = (date: Date|null) => {
        setTimeTo(date);
    };

    const handlePlace = (event: React.ChangeEvent<{value: unknown}>) => {
        setPlace(event.target.value as string);
    };

    const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setName(event.target.value as string)
    };

    const handleValidateName = () => {
        return (name.replace(/^\s/g, '').length <= 0 && name === "");
    };

    const handleDay = (event: React.ChangeEvent<{value: unknown}>) => {
        setDay(event.target.value as number);
    };

    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    };

    const handleAddSchedule = () => {
        let toBeInsertedTimeFrom = {hour: 0, minute: 0};
        let toBeInsertedTimeTo = {hour: 0, minute: 0};
        //console.log("time from : " + JSON.stringify(timeFrom) + " time To : " + JSON.stringify(timeTo));
        if(timeFrom !== null) toBeInsertedTimeFrom = {hour: timeFrom.getHours(), minute: timeFrom.getMinutes()};
        if(timeTo !== null) toBeInsertedTimeTo = {hour: timeTo.getHours(), minute: timeTo.getMinutes()};
        //console.log("to be from : " + JSON.stringify(toBeInsertedTimeFrom) + " to be To : " + JSON.stringify(toBeInsertedTimeTo));
        let newTimeRange = {
            timeFrom: {hour: toBeInsertedTimeFrom.hour, minute: toBeInsertedTimeFrom.minute},
            timeTo: {hour: toBeInsertedTimeTo.hour, minute: toBeInsertedTimeTo.minute}
        };
        let fetchedData = {
            index: 0,
            timeRange: newTimeRange,
            title: name,
            activity: description,
            place: place,
            color: DayLogicHandler.colorRandomizer(),
            tag: [],
        };
        //console.log("DAY : " + day);
        let inputDay = 1;
        if(day !== undefined) inputDay = day;
        let isSuccessful = LocalStorageHandler.addNewTableData(props.calenderData, fetchedData, inputDay);
        //console.log("IS SUC : " + isSuccessful);
        if(isSuccessful !== null){
            props.calenderDataCallback(isSuccessful);
            props.handleClose();
        }
    };

    const StyledTimePicker = withStyles({
        root:{
            width: "100%",
            margin: 5
        }
    })(TimePicker);

    const StyledGrid = withStyles({
        root:{
            display: "flex",
            marginBottom: 15,
        }
    })(Grid);

    const StyledFormControl = withStyles({
        root:{
            width: "50%",
            margin: 5,
            marginBottom: 15
        }
    })(FormControl);

    return(
            <Dialog fullWidth open={props.open} onClose={props.handleClose} aria-label={"form-add-table"} maxWidth="sm">
                <DialogTitle disableTypography id="form-add-table-title"> Add New Schedule </DialogTitle>
                    <DialogContent>
                        <form>
                            <div style={{margin: 5, marginBottom: 15}}>
                            <TextField
                                required
                                error={handleValidateName()}
                                helperText={handleValidateName() ? "Name must not be empty !" : ""}
                                id="input-name"
                                value={name}
                                onChange={handleSetName}
                                margin="dense"
                                variant="standard"
                                label="Name"
                                fullWidth
                            />
                            <TextField
                                id="input-description"
                                value={description}
                                onChange={handleDescription}
                                variant="standard"
                                margin="dense"
                                label="Description"
                                multiline
                                fullWidth
                            />
                            <TextField
                                id="input-place"
                                value={place}
                                onChange={handlePlace}
                                variant="standard"
                                margin="dense"
                                label="Location"
                                fullWidth
                            />
                            </div>
                                <StyledFormControl>
                                    <InputLabel id="select-day-of-the-week-label"> Day </InputLabel>
                                    <Select
                                        labelId="select-day-of-the-week-label"
                                        id="select-day-of-the-week"
                                        value={day}
                                        onChange={handleDay}>
                                        {props.calenderData.days.map((day: Day, index: number) =>
                                            <MenuItem key={index} value={index}>{ DayLogicHandler.fetchDay(index)}</MenuItem>
                                        )}
                                    </Select>
                                </StyledFormControl>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
                                    <StyledGrid>
                                        <StyledTimePicker
                                            label={"Time From"}
                                            value={timeFrom}
                                            onChange={handleSetTimeFrom}
                                        />
                                        <StyledTimePicker
                                            label={"Time To"}
                                            value={timeTo}
                                            onChange={handleSetTimeTo}
                                        />
                                    </StyledGrid>
                                </MuiPickersUtilsProvider>
                        </form>
                    </DialogContent>
                <DialogActions>
                        <Button onClick={props.handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddSchedule}>
                            Submit
                        </Button>
                </DialogActions>
            </Dialog>
    )
};

export default AddModal
