function calendarForMonth(year, month) {
  const daysOnMonth = new Date(year, month, 0).getDate(),
        currentDay = new Date().toDateString(),
        res = [];

  for (let i = 1; i <= daysOnMonth; i++) {
    const iterateDay = new Date(year, month - 1, i).toDateString();

    res.push({
      'numberOfDay': i,
      'dayOfWeekStr': iterateDay.slice(0, 3),
      'dayOfWeekNumber': new Date(year, month - 1, i).getDay(),
      'isToday': (iterateDay === currentDay) ? true : false
    });
  }

  return res;
}

function renderCalendar(calendarArr) {
  let innerHtmlCalendar = '';

  calendarArr.forEach((elem) => {
  let currentDayStyle = elem.isToday ? 'current' : '';
  innerHtmlCalendar += `
    <div class="cell ${currentDayStyle}">
      <div class="inner-cell">
        <div>
          ${elem.numberOfDay}
        </div>
        <div>
          ${elem.dayOfWeekStr}
        </div>
      </div>
    </div>
  `;
});
let emptyCells = '';
for (let i = 0; i < calendarArr[0].dayOfWeekNumber - 1; i++) {
  emptyCells += '<div class="empty"> </div>';
}

const wrapper = document.querySelector('.wrapper');
wrapper.innerHTML = emptyCells + innerHtmlCalendar;
}
renderCalendar(calendarForMonth(2022, 12));

function renderCalendarSelectors() {
  const years = document.createElement('select');
  const months = document.createElement('select');

  for (let i = 1; i <= 12; i++) {
    if (i === 12) {
      months.innerHTML += `<option selected>${i}</option>`;
    } else {
      months.innerHTML += `<option>${i}</option>`;
    }
  }
  for (let i = 1970; i <= 2030; i++) {
    if (i === 2022) {
      years.innerHTML += `<option selected>${i}</option>`;
    } else {
      years.innerHTML += `<option>${i}</option>`;
    }
  }

  const selectors = document.querySelector('.selectors');
  selectors.appendChild(years);
  selectors.appendChild(months);
}
renderCalendarSelectors();

const [yearSelector, monthSelector] = document.querySelector('.selectors').children;

yearSelector.addEventListener('change', (e) => {
  renderCalendar(calendarForMonth(e.target.value, monthSelector.value));
});
monthSelector.addEventListener('change', (e) => {
  renderCalendar(calendarForMonth(yearSelector.value, e.target.value));
});