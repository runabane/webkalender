const MockTimeBefore1 = {
    hour: 15,
    minute: 5
};

const MockTimeAfter1= {
    hour: 17,
    minute: 35
};

const MockTimeBefore2 = {
    hour: 8,
    minute: 0
};

const MockTimeAfter2 = {
    hour: 9,
    minute: 30
};

const TimeRange1 = {
    timeFrom: MockTimeBefore1,
    timeTo: MockTimeAfter1,
};

const TimeRange2 = {
    timeFrom: MockTimeBefore2,
    timeTo: MockTimeAfter2,
};

const MockTag = {
    color: "white",
    description: "Uni stuff"
};

const MockTableData1 = {
    index: 0,
    timeRange: TimeRange1,
    title: "Digitaltechnik",
    activity: "Vorlesung",
    place: "Hexagon",
    color: "white",
    tag: MockTag
};

const MockTableData2 = {
    index: 1,
    timeRange: TimeRange2,
    title: "AUD",
    activity: "Vorlesung",
    place: "Stadtmitte",
    color: "white",
    tag: MockTag
};

const MockDays1 = {
    index: 0,
    tables: [MockTableData1, MockTableData2]
};

const MockDays2 = {
    index: 1,
    tables: [MockTableData2]
};

const MockDays3 = {
    index: 2,
    tables: []
};

const MockDays4 = {
    index: 3,
    tables: []
};

const MockDays5 = {
    index: 4,
    tables: [MockTableData2]
};

const MockDays6 = {
    index: 5,
    tables: []
};

const MockDays7 = {
    index: 6,
    tables: []
};


const calenderData = {
    days: [MockDays1, MockDays2, MockDays3, MockDays4, MockDays5, MockDays6, MockDays7],
};

export default calenderData
