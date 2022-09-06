/**
* Fill calendar with year cells
*/
function populate_calendar(birthday, numYears) {
    const root = document.getElementById("calendar");

    // remove every existing child first, just in case
    while(root.children.length > 0) {
        root.children[0].remove();
    }

    let baseYear = birthday.getFullYear();
    // spawn years
    for (let i = 0; i < numYears; i++) {
        root.appendChild(spawn_year(baseYear + i, birthday));
    }
}

function spawn_year(_year, birthday) {
    let year_div = document.createElement("div");
    year_div.classList.add("year-wrapper");

    let title = document.createElement("h2");
    title.classList.add("year-label");
    title.innerHTML = _year;
    year_div.appendChild(title);

    let year_cell = document.createElement("div");
    year_cell.classList.add("year-cell");
    year_div.appendChild(year_cell);

    for(let i = 0; i < 12; i++) {
        let month_div = document.createElement("div");
        month_div.classList.add("month-cell");
        let num_days_per_square = days_in_month(i+1, _year) / 4
        for(let j = 0; j < 4; j++) {
            week_div = document.createElement("div");
            week_div.id = `${_year}-${i+1}-${j+1}`;
            week_div.classList.add("week-cell");

            let _ = new Date(_year, i, Math.floor((j+1)*num_days_per_square));

            if(new Date(_year, i, Math.floor((j+1)*num_days_per_square)) < birthday) {
                week_div.classList.add("invisible");
            }

            month_div.appendChild(week_div);
        }
        year_cell.appendChild(month_div);
    }

    return year_div;
}

// from https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
// Month in JavaScript is 0-indexed (January is 0, February is 1, etc),
// but by using 0 as the day it will give us the last day of the prior
// month. So passing in 1 as the month number will return the last day
// of January, not February
function days_in_month (month, year) {
    return new Date(year, month, 0).getDate();
}

function get_week_id_from_date(date) {
    let n_days = days_in_month(date.getMonth() + 1, date.getFullYear())
    let week_number = Math.floor((date.getDate()-1) / (n_days / 4));
    return `${date.getFullYear()}-${date.getMonth()+1}-${week_number + 1}`;
}

function write_life_event(life_event) {
    // trim description
    if(life_event['description'].length != null) {
      life_event['description'] = life_event['description'].trim();
    }

    let id = get_week_id_from_date(life_event['date']);
    week_div = document.getElementById(id);

    if(week_div == null || week_div.classList.contains("invisible")) {
        let y = life_event['date'].getFullYear();
        let m = life_event['date'].getMonth() + 1;
        let d = life_event['date'].getDate();
        console.error(`Event "${life_event['description']}" has an invalid date (${y}-${m}-${d})`);
        return;
    }

    week_div.style.backgroundColor = life_event['color'];

    // only add tooltip if has non-empty description
    if(life_event['description'] != null && life_event['description'].length > 0) {
      week_div.classList.add("has-tooltip");
      week_div.dataset.tooltip = life_event['description'];
    }
  
    if('icon' in life_event) {
        week_div.insertAdjacentHTML('beforeend', life_event['icon']);
    }
}


events = [
    /* event template:
    {
        'date': new Date("yyyy-mm-dd"),
        'description': "The description of the event",
        'color': "#888888",
        // 'icon': "👍" // optional
    }

    */
    {
        'date': new Date("1990-02-05"),
        'description': "I was born",
        'color': "#E1F5FE",
        'icon': "👶"
    },
    {
        'date': new Date("2011-05-13"),
        'description': "Started dating",
        'color': "#FCE4EC",
        'icon': "♥️"
    },
    {
        'date': new Date("2012-06-30"),
        'description': "Graduated",
        'color': "#039BE5",
        // icons are now optional
        // 'icon': "🎓"
    },
]



let calendar = document.getElementById("calendar");
populate_calendar(new Date("1990-06-16"), 60);

events.forEach(e => {
    write_life_event(e);
});

