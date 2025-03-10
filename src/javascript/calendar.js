const calendarDates = document.querySelector('.calendar-dates');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let  currentYear =  currentDate.getFullYear();

const months = [
    'Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'December'
];

function renderCalendar(month, year) {
    calendarDates.innerHTML = '';
    monthYear.textContent = `${months[month]} ${year}`;

    //Getting first day of the month function
    const firstDay = new Date(year, month, 1).getDay();

    //Getting the number of days per month function
    const daysInMonth =  new Date(year, month + 1, 0).getDate();

    //blank space for  day of week before first day
    for (let i = 0; i < firstDay; i++) {
        const blank  = document.createElement('div');
        calendarDates.appendChild(blank);
    }

    //today's date
    const today = new Date();

    for (let i = 1; i  <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.textContent = i;

        if(
            i === today.getDate() &&
            year === today.getFullYear() &&
            month === today.getMonth()
        ) {
            day.classList.add('current-date');
        }

        //code to click a date
        day.addEventListener("click", () => {
            //this is needed cause our backend recieves dates in the format  (YYYY-MM-DD)
            //month + 1 is due to javascripts months are ZERO indexed (january = 0)
            // "i" is day (1-31)
            //.padstart is the format - for example we need a month and day to be "03" and not "3"
            const selectedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            window.location.href = `showtimes.html?date=${selectedDate}`;
        })


        calendarDates.appendChild(day);
    }
}
renderCalendar(currentMonth, currentYear);

prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});