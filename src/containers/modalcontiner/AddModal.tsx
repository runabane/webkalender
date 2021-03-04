import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    TextField,
    withStyles,
    Input, Select, MenuItem, InputLabel, FormControl,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, TimePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import enLocale from "date-fns/locale/en-US";
import DayLogicHandler from '../../Logic/DayLogicHandler';
import Day from '../../dataModel/Day';

const AddModal = (props: any) => {

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [place, setPlace] = useState<string>();
    const [day, setDay] = useState<string>();
    const [timeFrom, setTimeFrom] = useState<Date|null>(new Date());
    const [timeTo, setTimeTo] = useState<Date|null>(new Date());

    const handleSetTimeFrom = (date: Date | null) => {
        setTimeFrom(date);
    };

    const handleSetTimeTo = (date: Date | null) => {
        setTimeTo(date);
    };

    const handleSetName = (name: string) => {
        setName(name)
    };

    const handleDay = (event: React.ChangeEvent<{value: unknown}>) => {
        setDay(event.target.value as string);
    };

    const StyledTimePicker = withStyles({
        root:{
            margin: 5,
            width: "100%"
        }
    })(TimePicker);

    const StyledDialogContent = withStyles({
        root:{
            display: "flex",
            //flexDirection: "column",
            margin: 5
        }
    })(DialogContent);

    const StyledFormControl = withStyles({
        root:{
            width: "50%"
        }
    })(FormControl);

    return(
            <Dialog fullWidth open={props.open} onClose={props.handleClose} aria-label={"form-add-table"} maxWidth="sm">
                <DialogTitle disableTypography id="form-add-table-title"> Add New Schedule </DialogTitle>
                <StyledDialogContent>
                    <TextField
                        required
                        value={name}
                        margin="dense"
                        variant="standard"
                        id="table-name"
                        label="Name"
                        fullWidth
                    />
                </StyledDialogContent>
                <StyledDialogContent>
                    <TextField
                        variant="standard"
                        margin="dense"
                        id="table-description"
                        label="Description"
                        multiline
                        fullWidth
                    />
                </StyledDialogContent>
                <StyledDialogContent>
                    <TextField
                        variant="standard"
                        margin="dense"
                        id="table-place"
                        label="Location"
                        fullWidth
                    />
                </StyledDialogContent>
                <StyledDialogContent>
                    <StyledFormControl>
                        <InputLabel id="select-day-of-the-week-label"> Day </InputLabel>
                        <Select
                            labelId="select-day-of-the-week-label"
                            id="select-day-of-the-week"
                            value={day}
                            onChange={handleDay}>
                            {props.days.map((day: Day, index: number) =>
                                <MenuItem value={index}>{ DayLogicHandler.fetchDay(index)}</MenuItem>
                            )}
                        </Select>
                    </StyledFormControl>
                </StyledDialogContent>
                <StyledDialogContent>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
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
                    </MuiPickersUtilsProvider>
                </StyledDialogContent>
                <DialogActions>
                        <Button onClick={props.handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={props.handleClose}>
                            Submit
                        </Button>
                </DialogActions>
            </Dialog>
    )
};

export default AddModal
