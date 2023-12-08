const activities = [
    {
        id: 0,
        date: "01-01-2024",
        activity: "New Years Day",
    },
    {
        id: 1,
        date: "01-01-2024",
        activity: "No School",
    },
    /** 
     * Formatting:
     * {
            date: "DD-MM-YYYY",
            acitivity: "Activity Name",
        },
        {
            date: "DD-MM-YYYY",
            activity: "Other Activity Name",
        },
    */
];
const calendar = document.querySelector("#calendar");
const monthBanner = document.querySelector("#month");
let navigation = 0;
let clicked = null;
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function loadCalendar() {
    const dt = new Date();

    if (navigation != 0) {
        dt.setMonth(new Date().getMonth() + navigation);
    }
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    monthBanner.innerText = `${dt.toLocaleDateString("en-us", {
        month: "long",
    })} ${year}`;
    calendar.innerHTML = "";
    const dayInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayofMonth = new Date(year, month, 1);
    const dateText = firstDayofMonth.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    const dayString = dateText.split(", ")[0];
    const emptyDays = weekdays.indexOf(dayString);

    for (let i = 1; i <= dayInMonth + emptyDays; i++) {
        const dayBox = document.createElement("div");
        dayBox.classList.add("day");
        const monthVal = month + 1 < 10 ? "0" + (month + 1) : month + 1;
        const dateVal = i - emptyDays < 10 ? "0" + (i - emptyDays) : i - emptyDays;
        const dateText = `${dateVal}-${monthVal}-${year}`;
        if (i > emptyDays) {
            dayBox.innerText = i - emptyDays;
            const eventOfTheDay = events.find((e) => e.date == dateText);
            const activitiesOfTheDay = activities.find((e) => e.date == dateText);

            if (i - emptyDays === day && navigation == 0) {
                dayBox.id = "currentDay";
            }

            if (eventOfTheDay) {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("event");
                eventDiv.innerText = eventOfTheDay.title;
                dayBox.appendChild(eventDiv);
            }
            if (activitiesOfTheDay) {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("event");
                eventDiv.classList.add("activity");
                eventDiv.innerText = activitiesOfTheDay.activity;
                dayBox.appendChild(eventDiv);
            }

            dayBox.addEventListener("click", () => {
                showmodel(dateText);
            });
        } else {
            dayBox.classList.add("plain");
        }
        calendar.append(dayBox);
    }
}
function buttons() {
    const btnBack = document.querySelector("#btnBack");
    const btnNext = document.querySelector("#btnNext");
    const btnDelete = document.querySelector("#btnDelete");
    const btnSave = document.querySelector("#btnSave");
    const closeButtons = document.querySelectorAll(".btnClose");
    const txtTitle = document.querySelector("#txtTitle");

    btnBack.addEventListener("click", () => {
        navigation--;
        loadCalendar();
    });
    btnNext.addEventListener("click", () => {
        navigation++;
        loadCalendar();
    });
    model.addEventListener("click", closemodel);
    closeButtons.forEach((btn) => {
        btn.addEventListener("click", closemodel);
    });
    btnDelete.addEventListener("click", function () {
        events = events.filter((e) => e.date !== clicked);
        localStorage.setItem("events", JSON.stringify(events));
        closemodel();
    });

    btnSave.addEventListener("click", function () {
        if (txtTitle.value) {
            txtTitle.classList.remove("error");
            events.push({
                date: clicked,
                title: txtTitle.value.trim(),
            });
            txtTitle.value = "";
            localStorage.setItem("events", JSON.stringify(events));
            closemodel();
        } else {
            txtTitle.classList.add("error");
        }
    });
}

const model = document.querySelector("#model");
const viewEventForm = document.querySelector("#viewEvent");
const addEventForm = document.querySelector("#addEvent");

function showmodel(dateText) {
    clicked = dateText;
    const eventOfTheDay = events.find((e) => e.date == dateText);
    if (eventOfTheDay) {
        document.querySelector("#eventText").innerText = eventOfTheDay.title;
        viewEventForm.style.display = "block";
    } else {
        addEventForm.style.display = "block";
    }
    model.style.display = "block";
}

//Close model
function closemodel() {
    viewEventForm.style.display = "none";
    addEventForm.style.display = "none";
    model.style.display = "none";
    clicked = null;
    loadCalendar();
}

buttons();
loadCalendar();