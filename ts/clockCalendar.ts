const elements: WallpaperElement[] = [
    new class extends WallpaperElement {
        update(date: Date, futureDate: Date) {
            if (props.clock24hrformat) {
                this.element.textContent = date.getHours().toString().padStart(2, "0");
            }
            else {
                this.element.textContent = ((date.getHours() % 12 != 0) ? (date.getHours() % 12) : 12).toString().padStart(2, "0");
            }

            this.updateAnimation(
                date.getMinutes(),
                59,
                60 * date.getMinutes() + date.getSeconds(),
                3599,
                60 * futureDate.getMinutes() + futureDate.getSeconds()
            );
        }
    }("#hours", adjustPercentage(0.025, 0.978)),

    new class extends WallpaperElement {
        update(date: Date, futureDate: Date) {
            this.element.textContent = date.getMinutes().toString().padStart(2, "0");

            this.updateAnimation(
                date.getSeconds(),
                59,
                date.getSeconds(),
                59,
                futureDate.getSeconds()
            );
        }
    }("#minutes", adjustPercentage(0.025, 0.978)),

    new class extends WallpaperElement {
        async update(date: Date) {
            this.element.textContent = date.getSeconds().toString().padStart(2, "0");

            this.element.style.transition = "";
            this.element.style.color = "var(--fillColor)";
            await sleep(100);
            this.element.style.transition = "color 175ms ease-out";
            this.element.style.color = "";
        }
    }("#seconds"),

    new class extends WallpaperElement {
        async update(date: Date, futureDate: Date) {
            this.element.textContent = (date.getHours() >= 12 ? "PM" : "AM");

            this.updateAnimation(
                date.getHours() % 12,
                11,
                3600 * (date.getHours() % 12) + 60 * date.getMinutes() + date.getSeconds(),
                43199,
                3600 * (futureDate.getHours() % 12) + 60 * futureDate.getMinutes() + futureDate.getSeconds()
            );
        }
    }("#hrFormat"),

    new class extends WallpaperElement {
        update(date: Date, futureDate: Date) {
            this.element.textContent = date.toLocaleString(props.locale, { weekday: "short" }).toUpperCase();

            this.updateAnimation(
                date.getHours(),
                23,
                3600 * date.getHours() + 60 * date.getMinutes() + date.getSeconds(),
                86399,
                3600 * futureDate.getHours() + 60 * futureDate.getMinutes() + futureDate.getSeconds()
            );
        }
    }("#dayName", adjustPercentage(0.027, 0.972)),

    new class extends WallpaperElement {
        update(date: Date, futureDate: Date) {
            this.element.textContent = date.getDate().toString().padStart(2, "0");

            this.updateAnimation(
                date.getHours(),
                23,
                3600 * date.getHours() + 60 * date.getMinutes() + date.getSeconds(),
                86399,
                3600 * futureDate.getHours() + 60 * futureDate.getMinutes() + futureDate.getSeconds()
            );
        }
    }("#day", adjustPercentage(0.024, 0.973)),

    new class extends WallpaperElement {
        update(date: Date, futureDate: Date) {
            this.element.textContent = date.toLocaleString(props.locale, { month: "short" }).toUpperCase();

            this.updateAnimation(
                date.getDate() - 1,
                getDaysInMonth(date.getFullYear(), date.getMonth()) - 1,
                86400 * (date.getDate() - 1) + 3600 * date.getHours() + 60 * date.getMinutes() + date.getSeconds(),
                86400 * (getDaysInMonth(date.getFullYear(), date.getMonth()) - 2) + 86399,
                86400 * (futureDate.getDate() - 1) + 3600 * futureDate.getHours() + 60 * futureDate.getMinutes() + futureDate.getSeconds()
            );
        }
    }("#month", adjustPercentage(0.027, 0.972)),

    new class extends WallpaperElement {
        update(date: Date, futureDate: Date) {
            this.element.textContent = date.getFullYear().toString();

            this.updateAnimation(
                date.getMonth(),
                11,
                86400 * (getPassedDaysInYear(date.getFullYear(), date.getMonth()) + date.getDate() - 1) + 3600 * date.getHours() + 60 * date.getMinutes() + date.getSeconds(),
                86400 * (getDaysInYear(date.getFullYear()) - 2) + 86399,
                86400 * (getPassedDaysInYear(futureDate.getFullYear(), futureDate.getMonth()) + futureDate.getDate() - 1) + 3600 * futureDate.getHours() + 60 * futureDate.getMinutes() + futureDate.getSeconds()
            );
        }
    }("#year", adjustPercentage(0.027, 0.972))
];

update();
setInterval(update, 1000);

function update() {
    const date = new Date();
    const futureDate = new Date(date);
    futureDate.setSeconds(futureDate.getSeconds() + 1);

    elements.forEach(element => element.update(date, futureDate));
}