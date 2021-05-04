import React, {useCallback, useRef, useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    TextField,
    withStyles,
    Input, Select, MenuItem, InputLabel, FormControl, Grid, Typography, ClickAwayListener,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, TimePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import enLocale from "date-fns/locale/en-US";
import DayLogicHandler from '../../Logic/DayLogicHandler';
import Day from '../../dataModel/Day';
import LocalStorageHandler from "../../LocalStorageHandler/LocalStorageHandler";

const StatusModal = (props: any) => {

    const [name, setName] = useState(props.tableData.title);
    const [editName, setEditName] = useState(false);
    const [description, setDescription] = useState<string>(props.tableData.activity);
    const [editDescription, setEditDescription] = useState(false);
    const [place, setPlace] = useState<string>(props.tableData.place);
    const [editPlace, setEditPlace] = useState(false);
    const [day, setDay] = useState<number>();
    const [timeFrom, setTimeFrom] = useState<Date|null>(new Date());
    const [timeTo, setTimeTo] = useState<Date|null>(new Date());
    const calenderDataLocal = useRef(props.calenderData);

    const handleOnCloseModal = () => {
        props.calenderDataCallback(calenderDataLocal.current);
        console.log("hueheuheu");
        props.handleClose();
    };

    const handleSaveDataTemporal = (inputValue: string) => {
        if(inputValue !== name){
            let newCalenderData = props.calenderData;
            newCalenderData.days[props.dayIndex].tables[props.tableData.index].title = inputValue;
            setName(inputValue);
            calenderDataLocal.current = newCalenderData;
            LocalStorageHandler.updateTableData(newCalenderData.days[props.dayIndex].tables[props.tableData.index], props.dayIndex);
        }
    };

    const handleSetTimeFrom = (date: Date|null) => {
        setTimeFrom(date);
    };

    const handleSetTimeTo = (date: Date|null) => {
        setTimeTo(date);
    };

    const handlePlace = (event: React.ChangeEvent<{value: unknown}>) => {
        setPlace(event.target.value as string);
    };

    const handleSetName = (event: React.FocusEvent<HTMLInputElement>) => {
        event.preventDefault();
        const inputValue = event.target.value as string;
        if(inputValue !== name){
            let newCalenderData = props.calenderData;
            newCalenderData.days[props.dayIndex].tables[props.tableData.index].title = inputValue;
            setName(inputValue);
            calenderDataLocal.current = newCalenderData;
            LocalStorageHandler.updateTableData(newCalenderData.days[props.dayIndex].tables[props.tableData.index], props.dayIndex);
            setEditName(!editName);
        }
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
        /*
        let isSuccessful = LocalStorageHandler.addNewTableData(props.calenderData, fetchedData, inputDay);
        //console.log("IS SUC : " + isSuccessful);
        if(isSuccessful !== null){
            props.calenderDataCallback(isSuccessful);
            props.handleClose();
        }

         */
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
            <Dialog fullWidth open={props.open} onClose={handleOnCloseModal} aria-label={"form-add-table"} maxWidth="sm">
                    <DialogContent>
                        <form>
                            <div style={{flex: 1, flexDirection: 'row', margin: 5, marginBottom: 15}}>
                                {!editName ?
                                    <Button onDoubleClick={() => setEditName(!editName)} fullWidth>
                                    <Typography variant="h4">
                                        {name}
                                    </Typography>
                                    </Button>:
                            <TextField
                                required
                                error={handleValidateName()}
                                helperText={handleValidateName() ? "Name must not be empty !" : ""}
                                id="input-name"
                                defaultValue={name}
                                onBlur={handleSetName}
                                margin="dense"
                                variant="standard"
                                label="Name"
                                fullWidth
                            /> }
                                {!editDescription ?
                                    <Button onDoubleClick={() => setEditDescription(!editDescription)} fullWidth>
                                        <Typography variant="subtitle1">
                                            {description}
                                        </Typography>
                                    </Button>:
                            <TextField
                                id="input-description"
                                value={description}
                                onChange={handleDescription}
                                onBlur={() => setEditDescription(!editDescription)}
                                variant="standard"
                                margin="dense"
                                label="Description"
                                multiline
                                fullWidth
                            />}
                                {!editPlace ?
                                    <Button onDoubleClick={() => setEditPlace(!editPlace)} fullWidth>
                                        <Typography variant="subtitle1">
                                            {place}
                                        </Typography>
                                    </Button>:
                                    <TextField
                                        id="input-description"
                                        value={place}
                                        onChange={handlePlace}
                                        onBlur={() => setEditPlace(!editPlace)}
                                        variant="standard"
                                        margin="dense"
                                        label="Description"
                                        multiline
                                        fullWidth
                                    />}
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
            </Dialog>
    )
};

export default StatusModal
