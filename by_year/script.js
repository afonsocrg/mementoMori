let calendar = document.getElementById("calendar");

populate_calendar(1999, 60);

/**
* Fill calendar with year cells
*/
function populate_calendar(baseYear, numYears) {
    const root = document.getElementById("calendar");

    // remove every existing child first, just in case
    while(root.children.length > 0) {
        root.children[0].remove();
    }

    // spawn years
    for (let i = 0; i < numYears; i++) {
        root.appendChild(spawn_year(baseYear + i));
    }
}

function spawn_year(_year) {
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
        for(let j = 0; j < 4; j++) {
            week_div = document.createElement("div");
            week_div.classList.add("week-cell");

            // Remove this if in the future, it's for experimenting purposes only (we don't want all of the cells to be filled)
            if ( i == 3 && j == 3) {
                week_div.classList.add("has-tooltip");

                // TODO: This data will come from json entries
                week_div.dataset.tooltip = "I was born, and this is a bit longer text that fits perfectly";
                week_div.insertAdjacentHTML('beforeend', "👶");
            }

            month_div.appendChild(week_div);
        }
        year_cell.appendChild(month_div);
    }

    return year_div;
}
