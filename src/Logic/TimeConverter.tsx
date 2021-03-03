import React from "react";
import Time from "../dataModel/Time";

const TimeConverter = (timeFrom: Time, timeTo: Time) => {
     return `${convertNumber(timeFrom.hour)}:${convertNumber(timeFrom.minute)} - ${convertNumber(timeTo.hour)}:${convertNumber(timeTo.minute)}`
};

const convertNumber = (hour: number) => {
    return hour < 10 ? `0${hour}` : hour
}

export default TimeConverter
