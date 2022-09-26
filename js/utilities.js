"use strict";
class WallpaperElement {
    constructor(id, adjustPercentageFunction = adjustPercentage()) {
        this.element = document.querySelector(id);
        this.adjustPercentage = adjustPercentageFunction;
    }
    async updateAnimation(value, maxValue, linearValue, maxLinearValue, futureValue) {
        if (props.linearanimations) {
            if (linearValue == 0) {
                this.element.style.setProperty("--animationStyle", "250ms ease-out");
                this.element.style.setProperty("--percentage", "200%");
                await sleep(250);
                this.element.style.setProperty("--percentage", "0%");
                this.element.style.setProperty("--animationStyle", "none");
                this.element.offsetTop;
                this.element.style.setProperty("--animationStyle", "");
            }
            this.element.style.setProperty("--percentage", (linearValue == maxLinearValue) ? "100%" : this.adjustPercentage(futureValue / (maxLinearValue + 1)));
        }
        else {
            if (linearValue == 0) {
                this.element.style.setProperty("--animationStyle", "250ms ease-out");
                this.element.style.setProperty("--percentage", "200%");
                await sleep(500);
                this.element.style.setProperty("--percentage", "0%");
                this.element.style.setProperty("--animationStyle", "none");
                this.element.offsetTop;
                this.element.style.setProperty("--animationStyle", "");
            }
            else {
                this.element.style.setProperty("--percentage", this.adjustPercentage(value / maxValue));
            }
        }
    }
}
class WeatherElement {
    constructor(id) {
        this.element = document.querySelector(id);
    }
}
async function sleep(milliseconds) {
    return new Promise((res) => setTimeout(res, milliseconds));
}
function parseProps(props) {
    return Object.fromEntries(Object.entries(props).map(([key, { value }]) => [key, value]));
}
function adjustPercentage(min = 0, max = 1) {
    return (percentage) => {
        if (percentage == 0) {
            return "0%";
        }
        else if (percentage == 1) {
            return "100%";
        }
        else {
            return `${(min + (max - min) * percentage) * 100}%`;
        }
    };
}
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
function temperatureColor(celsius) {
    if (celsius < -5) {
        return "#001740";
    }
    else if (celsius < -2.5) {
        return "#0000FF";
    }
    else if (celsius < 0) {
        return "#0066FF";
    }
    else if (celsius < 2.5) {
        return "#0099FF";
    }
    else if (celsius < 5) {
        return "#33CCFF";
    }
    else if (celsius < 7.5) {
        return "#66FFFF";
    }
    else if (celsius < 10) {
        return "#66FF99";
    }
    else if (celsius < 12.5) {
        return "#66FF00";
    }
    else if (celsius < 15) {
        return "#BFFA0E";
    }
    else if (celsius < 17.5) {
        return "#FFFF09";
    }
    else if (celsius < 20) {
        return "#FFCC00";
    }
    else if (celsius < 22.5) {
        return "#FF9900";
    }
    else if (celsius < 25) {
        return "#FF6600";
    }
    else if (celsius < 27.5) {
        return "#FF3300";
    }
    else if (celsius < 30) {
        return "#FF0000";
    }
    else if (celsius < 32.5) {
        return "#B20000";
    }
    else if (celsius < 35) {
        return "#990000";
    }
    else if (celsius < 37.5) {
        return "#6C0000";
    }
    else if (celsius < 40) {
        return "#A00077";
    }
    else {
        return "#CC00CC";
    }
}
function parseColor(color) {
    return color ? `rgb(${color.split(" ").map((color) => Math.floor(255 * parseFloat(color))).join(",")})` : "";
}
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
function getPassedDaysInYear(year, month) {
    let days = 0;
    for (let i = 0; i < month; i++) {
        days += getDaysInMonth(year, i);
    }
    return days;
}
function getDaysInYear(year) {
    let days = 0;
    for (let i = 0; i < 12; i++) {
        days += getDaysInMonth(i, year);
    }
    return days;
}
function setAlignment(element, alignment) {
    switch (alignment) {
        case AlignmentType.topLeft:
            element.style.setProperty("--translateX", "0%");
            element.style.setProperty("--translateY", "0%");
            element.style.transformOrigin = "top left";
            break;
        case AlignmentType.topCenter:
            element.style.setProperty("--translateX", "-50%");
            element.style.setProperty("--translateY", "0%");
            element.style.transformOrigin = "top";
            break;
        case AlignmentType.topRight:
            element.style.setProperty("--translateX", "-100%");
            element.style.setProperty("--translateY", "0%");
            element.style.transformOrigin = "top right";
            break;
        case AlignmentType.middleLeft:
            element.style.setProperty("--translateX", "0%");
            element.style.setProperty("--translateY", "-50%");
            element.style.transformOrigin = "center left";
            break;
        case AlignmentType.middleCenter:
            element.style.setProperty("--translateX", "-50%");
            element.style.setProperty("--translateY", "-50%");
            element.style.transformOrigin = "center";
            break;
        case AlignmentType.middleRight:
            element.style.setProperty("--translateX", "-100%");
            element.style.setProperty("--translateY", "-50%");
            element.style.transformOrigin = "center right";
            break;
        case AlignmentType.bottomLeft:
            element.style.setProperty("--translateX", "0%");
            element.style.setProperty("--translateY", "-100%");
            element.style.transformOrigin = "bottom left";
            break;
        case AlignmentType.bottomCenter:
            element.style.setProperty("--translateX", "-50%");
            element.style.setProperty("--translateY", "-100%");
            element.style.transformOrigin = "bottom";
            break;
        case AlignmentType.bottomRight:
            element.style.setProperty("--translateX", "-100%");
            element.style.setProperty("--translateY", "-100%");
            element.style.transformOrigin = "bottom right";
            break;
    }
}
//# sourceMappingURL=utilities.js.map