enum BackgroundType {
    color = 1,
    image,
    video
}

enum AlignmentType {
    topLeft = 1,
    topCenter,
    topRight,
    middleLeft,
    middleCenter,
    middleRight,
    bottomLeft,
    bottomCenter,
    bottomRight
}

enum CalendarOrder {
    first = 1,
    second,
    third,
    fourth,
    hidden
}

type Background = {
    type: BackgroundType;
    color?: string;
    image?: string;
    video?: string;
};

type Properties = {
    /* Background Options */
    backgroundselect: BackgroundType;
    backgroundcolor: string;
    backgroundimage: string;
    backgroundvideo: string;

    /* Widgets */
    locale: string;
    linearanimations: boolean;
    enableclock: boolean;
    enablecalendar: boolean;
    enableweather: boolean;

    /* Clock Options */
    clocksize: number;
    clockalignment: AlignmentType;
    clockx: number;
    clocky: number;
    clockbackground: boolean;
    clockbackgroundcolor: string;
    clockbackgroundopacity: number;
    clock24hrformat: boolean;
    clockseconds: boolean;

    /* Calendar Options */
    calendarsize: number;
    calendaralignment: AlignmentType;
    calendarx: number;
    calendary: number;
    calendarbackground: boolean;
    calendarbackgroundcolor: string;
    calendarbackgroundopacity: number;
    calendarweekdayorder: CalendarOrder;
    calendardayorder: CalendarOrder;
    calendarmonthorder: CalendarOrder;
    calendaryearorder: CalendarOrder;

    /* Weather Options */
    weathersize: number;
    weatheralignment: AlignmentType;
    weatherx: number;
    weathery: number;
    weatherbackground: boolean;
    weatherbackgroundcolor: string;
    weatherbackgroundopacity: number;
    weatherapikey: string;
    weatherlocation: string;
    usecelsius: boolean;

    /* Colors */
    dynamictemperaturecolor: boolean;
    differentcolors: boolean;
    textcolor: string;
    clockseparatorcolor: string;
    hourscolor: string;
    minutescolor: string;
    secondscolor: string;
    ampmcolor: string;
    daynamecolor: string;
    daycolor: string;
    monthcolor: string;
    yearcolor: string;
    differentfillcolors: boolean;
    fillcolor: string;
    hoursfill: string;
    minutesfill: string;
    secondsfill: string;
    ampmfill: string;
    daynamefill: string;
    dayfill: string;
    monthfill: string;
    yearfill: string;
    temperaturefill: string;
    weatherfill: string;
};

interface Window {
    wallpaperPropertyListener: {
        applyUserProperties: (properties: { [key: string]: { value: number | boolean | string; }; }) => void;
        setPaused: (isPaused: boolean) => void;
    };
}