import React from "react";
import Time from "../dataModel/Time";

const TimeConverter = (timeFrom: Time, timeTo: Time) => {
     return `${convertNumber(timeFrom.hour)}:${convertNumber(timeFrom.minute)} - ${convertNumber(timeTo.hour)}:${convertNumber(timeTo.minute)}`
};

const convertNumber = (time: number) => {
    return time < 10 ? `0${time}` : time
};

export default {TimeConverter,convertNumber}
