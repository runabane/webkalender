import Time from "../dataModel/Time";

const checkTimeBound = (time: Time): boolean => {
    return (time.hour <= 24 && time.hour >= 0) && (time.minute <= 60 && time.minute >= 0)
};

const getTimeInSecond = (time: Time): number => {
    return (time.hour * 36000)+ (time.minute * 60)
};

const compareHour = (this_Time: Time, that_Time: Time) => {
    return this_Time.hour > that_Time.hour ? 1 : this_Time.hour === that_Time.hour ? 0 : -1
};

const compareMinute = (this_Time: Time, that_Time: Time) => {
    return this_Time.minute > that_Time.minute ? 1 : this_Time.minute === that_Time.minute ? 0 : -1
};

/**
 * 1 if this_time > that_time
 * 0 if same
 * else -1
 * @param this_Time
 * @param that_Time
 */
const compareTime = (this_Time: Time, that_Time: Time) => {
    let hour = compareHour(this_Time, that_Time);
    let min = compareMinute(this_Time, that_Time);

    return  hour > 0 ? hour : hour === 0 && min === 0 ? 0 : -1;
}

const TimeLogicHandler = {
    checkTimeBound: checkTimeBound,
    getTimeInSecond: getTimeInSecond,
    compareTime: compareTime
};

export default TimeLogicHandler
