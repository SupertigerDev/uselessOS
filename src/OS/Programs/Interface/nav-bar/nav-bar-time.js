const time = document.getElementById("nav-time")
const date = document.getElementById("nav-date")
const monthList = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December"
]
setNavDateTime()
setInterval(() => {
    setNavDateTime()
}, 1000);

function setNavDateTime() {
    const now = new Date();
    time.innerText = formatTime(now);
    date.innerText = formatDate(now);
}

function formatTime(now = new Date()) {
    let hrs = now.getHours()
    let mins = now.getMinutes()
    if (hrs <= 9 ) hrs = `0${hrs}`;
    if (mins <= 9 ) mins = `0${mins}`;
    return `${hrs}:${mins}`
}
function formatDate(now = new Date()) {
    const date = now.getDate();
    const month = now.getMonth();
    return `${date} ${monthList[month]}`;
}

console.log(top)