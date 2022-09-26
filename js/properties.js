"use strict";
const elementIDs = "#hours, #minutes, #seconds, #hrFormat, #clock span, #dayName, #day, #month, #year, #weatherName, #location, #temperature";
let props = {};
window.wallpaperPropertyListener = {
    applyUserProperties: _props => (async (newProps) => {
        let shouldUpdate = false;
        let shouldUpdateWeather = false;
        const clockElement = document.querySelector("#clock");
        const calendarElement = document.querySelector("#calendar");
        const weatherElement = document.querySelector("#weather");
        props = { ...props, ...newProps };
        /* Background Options */
        {
            if ([newProps.backgroundselect, newProps.backgroundcolor, newProps.backgroundimage, newProps.backgroundvideo].some(prop => prop != undefined)) {
                const videoElement = document.querySelector("video");
                document.body.style.background = "";
                videoElement.src = "";
                videoElement.style.display = "none";
                switch (props.backgroundselect) {
                    case BackgroundType.color:
                        document.body.style.background = props.backgroundcolor ? parseColor(props.backgroundcolor) : "rgb(30, 30, 30)";
                        break;
                    case BackgroundType.image:
                        document.body.style.background = `url("${props.backgroundimage ? `file:///${props.backgroundimage}` : "./welcomeImage.png"}") no-repeat center / cover`;
                        break;
                    case BackgroundType.video:
                        videoElement.style.display = "";
                        videoElement.src = props.backgroundvideo ? `file:///${props.backgroundvideo}` : "";
                        break;
                }
            }
        }
        /* Widgets */
        {
            if (newProps.locale != undefined) {
                shouldUpdate = shouldUpdateWeather = true;
            }
            if (newProps.linearanimations != undefined) {
                document.documentElement.style.setProperty("--animationStyle", newProps.linearanimations ? "1000ms linear" : "");
                shouldUpdate = true;
            }
            if (newProps.enableclock != undefined) {
                clockElement.style.display = newProps.enableclock ? "" : "none";
            }
            if (newProps.enablecalendar != undefined) {
                calendarElement.style.display = newProps.enablecalendar ? "" : "none";
            }
            if (newProps.enableweather != undefined) {
                weatherElement.style.display = newProps.enableweather ? "" : "none";
                shouldUpdateWeather = true;
            }
        }
        /* Clock Options */
        {
            const clockBackground = clockElement.querySelector(".background");
            const hrFormatElement = document.querySelector("#hrFormat");
            const secondsSeparatorElement = document.querySelector("#secondsSeparator");
            const secondsElement = document.querySelector("#seconds");
            if (newProps.clocksize != undefined) {
                clockElement.style.setProperty("--scale", (newProps.clocksize / 100).toString());
            }
            if (newProps.clockalignment != undefined) {
                setAlignment(clockElement, newProps.clockalignment);
            }
            if (newProps.clockx != undefined) {
                clockElement.style.left = `${newProps.clockx}%`;
            }
            if (newProps.clocky != undefined) {
                clockElement.style.top = `${newProps.clocky}%`;
            }
            if (newProps.clockbackground != undefined) {
                clockBackground.style.display = newProps.clockbackground ? "" : "none";
            }
            if (newProps.clockbackgroundcolor != undefined) {
                clockBackground.style.background = parseColor(newProps.clockbackgroundcolor);
            }
            if (newProps.clockbackgroundopacity != undefined) {
                clockBackground.style.opacity = (newProps.clockbackgroundopacity / 100).toString();
            }
            if (newProps.clock24hrformat != undefined) {
                hrFormatElement.style.display = newProps.clock24hrformat ? "none" : "";
                shouldUpdate = true;
            }
            if (newProps.clockseconds != undefined) {
                secondsSeparatorElement.style.display = secondsElement.style.display = newProps.clockseconds ? "" : "none";
            }
        }
        /* Calendar Options */
        {
            const calendarBackground = calendarElement.querySelector(".background");
            const dayNameElement = document.querySelector("#dayName");
            const dayElement = document.querySelector("#day");
            const monthElement = document.querySelector("#month");
            const yearElement = document.querySelector("#year");
            if (newProps.calendarsize != undefined) {
                calendarElement.style.setProperty("--scale", (newProps.calendarsize / 100).toString());
            }
            if (newProps.calendaralignment != undefined) {
                setAlignment(calendarElement, newProps.calendaralignment);
            }
            if (newProps.calendarx != undefined) {
                calendarElement.style.left = `${newProps.calendarx}%`;
            }
            if (newProps.calendary != undefined) {
                calendarElement.style.top = `${newProps.calendary}%`;
            }
            if (newProps.calendarbackground != undefined) {
                calendarBackground.style.display = newProps.calendarbackground ? "" : "none";
            }
            if (newProps.calendarbackgroundcolor != undefined) {
                calendarBackground.style.background = parseColor(newProps.calendarbackgroundcolor);
            }
            if (newProps.calendarbackgroundopacity != undefined) {
                calendarBackground.style.opacity = (newProps.calendarbackgroundopacity / 100).toString();
            }
            if (newProps.calendarweekdayorder != undefined) {
                dayNameElement.style.display = newProps.calendarweekdayorder == CalendarOrder.hidden ? "none" : "";
                dayNameElement.style.order = newProps.calendarweekdayorder.toString();
            }
            if (newProps.calendardayorder != undefined) {
                dayElement.style.display = newProps.calendardayorder == CalendarOrder.hidden ? "none" : "";
                dayElement.style.order = newProps.calendardayorder.toString();
            }
            if (newProps.calendarmonthorder != undefined) {
                monthElement.style.display = newProps.calendarmonthorder == CalendarOrder.hidden ? "none" : "";
                monthElement.style.order = newProps.calendarmonthorder.toString();
            }
            if (newProps.calendaryearorder != undefined) {
                yearElement.style.display = newProps.calendaryearorder == CalendarOrder.hidden ? "none" : "";
                yearElement.style.order = newProps.calendaryearorder.toString();
            }
        }
        /* Weather Options */
        {
            const weatherBackground = weatherElement.querySelector(".background");
            if (newProps.weathersize != undefined) {
                weatherElement.style.setProperty("--scale", (newProps.weathersize / 100).toString());
            }
            if (newProps.weatheralignment != undefined) {
                setAlignment(weatherElement, newProps.weatheralignment);
            }
            if (newProps.weatherx != undefined) {
                weatherElement.style.left = `${newProps.weatherx}%`;
            }
            if (newProps.weathery != undefined) {
                weatherElement.style.top = `${newProps.weathery}%`;
            }
            if (newProps.weatherbackground != undefined) {
                weatherBackground.style.display = newProps.weatherbackground ? "" : "none";
            }
            if (newProps.weatherbackgroundcolor != undefined) {
                weatherBackground.style.background = parseColor(newProps.weatherbackgroundcolor);
            }
            if (newProps.weatherbackgroundopacity != undefined) {
                weatherBackground.style.opacity = (newProps.weatherbackgroundopacity / 100).toString();
            }
            if (newProps.weatherapikey != undefined) {
                shouldUpdateWeather = true;
            }
            if (newProps.weatherlocation != undefined) {
                shouldUpdateWeather = true;
            }
            if (newProps.usecelsius != undefined) {
                shouldUpdateWeather = true;
            }
        }
        /* Colors */
        {
            if (newProps.dynamictemperaturecolor != undefined) {
                if (!newProps.dynamictemperaturecolor) {
                    document.querySelector("#temperature").style.color = "";
                }
                else {
                    shouldUpdateWeather = true;
                }
            }
            if (newProps.textcolor != undefined) {
                document.documentElement.style.setProperty("--color", parseColor(newProps.textcolor));
            }
            if (newProps.clockseparatorcolor != undefined) {
                document.querySelectorAll("#clock span").forEach(element => element.style.setProperty("--color", parseColor(newProps.clockseparatorcolor ?? props.clockseparatorcolor)));
            }
            if (newProps.hourscolor != undefined) {
                document.querySelector("#hours").style.setProperty("--color", parseColor(newProps.hourscolor ?? props.hourscolor));
            }
            if (newProps.minutescolor != undefined) {
                document.querySelector("#minutes").style.setProperty("--color", parseColor(newProps.minutescolor ?? props.minutescolor));
            }
            if (newProps.secondscolor != undefined) {
                document.querySelector("#seconds").style.setProperty("--color", parseColor(newProps.secondscolor ?? props.secondscolor));
            }
            if (newProps.ampmcolor != undefined) {
                document.querySelector("#hrFormat").style.setProperty("--color", parseColor(newProps.ampmcolor ?? props.ampmcolor));
            }
            if (newProps.daynamecolor != undefined) {
                document.querySelector("#dayName").style.setProperty("--color", parseColor(newProps.daynamecolor ?? props.daynamecolor));
            }
            if (newProps.daycolor != undefined) {
                document.querySelector("#day").style.setProperty("--color", parseColor(newProps.daycolor ?? props.daycolor));
            }
            if (newProps.monthcolor != undefined) {
                document.querySelector("#month").style.setProperty("--color", parseColor(newProps.monthcolor ?? props.monthcolor));
            }
            if (newProps.yearcolor != undefined) {
                document.querySelector("#year").style.setProperty("--color", parseColor(newProps.yearcolor ?? props.yearcolor));
            }
            if (newProps.fillcolor != undefined) {
                document.documentElement.style.setProperty("--fillColor", parseColor(newProps.fillcolor));
            }
            if (newProps.hoursfill != undefined) {
                document.querySelector("#hours").style.setProperty("--fillColor", parseColor(newProps.hoursfill ?? props.hoursfill));
            }
            if (newProps.minutesfill != undefined) {
                document.querySelector("#minutes").style.setProperty("--fillColor", parseColor(newProps.minutesfill ?? props.minutesfill));
            }
            if (newProps.secondsfill != undefined) {
                document.querySelector("#seconds").style.setProperty("--fillColor", parseColor(newProps.secondsfill ?? props.secondsfill));
            }
            if (newProps.ampmfill != undefined) {
                document.querySelector("#hrFormat").style.setProperty("--fillColor", parseColor(newProps.ampmfill ?? props.ampmfill));
            }
            if (newProps.daynamefill != undefined) {
                document.querySelector("#dayName").style.setProperty("--fillColor", parseColor(newProps.daynamefill ?? props.daynamefill));
            }
            if (newProps.dayfill != undefined) {
                document.querySelector("#day").style.setProperty("--fillColor", parseColor(newProps.dayfill ?? props.dayfill));
            }
            if (newProps.monthfill != undefined) {
                document.querySelector("#month").style.setProperty("--fillColor", parseColor(newProps.monthfill ?? props.monthfill));
            }
            if (newProps.yearfill != undefined) {
                document.querySelector("#year").style.setProperty("--fillColor", parseColor(newProps.yearfill ?? props.yearfill));
            }
            if (newProps.temperaturefill != undefined) {
                document.querySelector("#temperature").style.setProperty("--fillColor", parseColor(newProps.temperaturefill ?? props.temperaturefill));
            }
            if (newProps.weatherfill != undefined) {
                document.querySelector("#weatherName").style.setProperty("--fillColor", parseColor(newProps.weatherfill ?? props.weatherfill));
                document.querySelector("#location").style.setProperty("--fillColor", parseColor(newProps.weatherfill ?? props.weatherfill));
            }
            if (newProps.differentcolors === false) {
                document.querySelectorAll(elementIDs).forEach(element => element.style.setProperty("--color", ""));
            }
            if (newProps.differentfillcolors === false) {
                document.querySelectorAll(elementIDs).forEach(element => element.style.setProperty("--fillColor", ""));
            }
        }
        if (shouldUpdate)
            update();
        if (shouldUpdateWeather)
            updateWeather();
    })(parseProps(_props)),
    setPaused: (isPaused) => {
        if (isPaused)
            return;
        update();
        updateWeather();
    }
};
//# sourceMappingURL=properties.js.map