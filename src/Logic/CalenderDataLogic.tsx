import DayLogicHandler from "./DayLogicHandler";

const generateEmptyCalender = () => {
  return {
      days: DayLogicHandler.generateEmptyWeek()
  }
};

const CalenderDataLogic = {
    generateEmptyCalender: generateEmptyCalender
};

export default CalenderDataLogic
