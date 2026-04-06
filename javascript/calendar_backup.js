
import { data } from "../data/data.js";


/* =========================
Calendar Data
========================= */

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

/* =========================
Events Data
========================= */

const events = [
  {
    title: "Goblin’s Hole KLE",
    date: "2026-04-12",
    location: "Gatesville, TX",
  },
  {
    title: "3rd Annual Munchies at Nocturnus",
    date: "2026-04-18",
    location: "Austin, TX",
    detail: true,
  },
  {
    title: "Qualifiers (Nocturnus)",
    date: "2026-04-25",
    location: "Austin, TX",
  },
  {
    title: "Traitor’s Gate",
    date: "2026-05-02",
    location: "San Antonio, TX",
  },
  {
    title: "End Reign",
    date: "2026-06-05",
    location: "Nolte Island, TX",
  },
];

/* =========================
Init
========================= */

createMonthButtons();
renderCalendar();
renderEvents();

/* =========================
Month Buttons
========================= */

function createMonthButtons() {
  const nav = document.getElementById("monthNav");

  months.forEach((m, i) => {
    const btn = document.createElement("button");
    btn.textContent = m;
    btn.className = "month-btn";

    if (i === currentMonth) btn.classList.add("active");
    btn.onclick = () => {
      currentMonth = i;
      renderCalendar();
      updateMonthActive();
    };
    nav.appendChild(btn);
  });
}

function updateMonthActive() {
  document.querySelectorAll(".month-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === currentMonth);
  });
}

function updateSelectedMonthTitle() {
  const title = document.getElementById("selectedMonthTitle");
  title.textContent = months[currentMonth] + " " + currentYear;
}

/* =========================
Year Controls
========================= */

document.getElementById("prevYear").onclick = () => {
  currentYear--;
  renderCalendar();
};

document.getElementById("nextYear").onclick = () => {
  currentYear++;
  renderCalendar();
};

/* =========================
Render Calendar
========================= */

function renderCalendar() {
  updateSelectedMonthTitle();
  document.getElementById("yearDisplay").textContent = currentYear;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const tbody = document.getElementById("calendarBody");

  tbody.innerHTML = "";
  let date = 1;

  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("td");
      if (i === 0 && j < firstDay) {
        cell.textContent = "";
      } else if (date > daysInMonth) {
        break;
      } else {
        cell.textContent = date;

        /* Today Highlight */
        const today = new Date();

        if (
          date === today.getDate() &&
          currentMonth === today.getMonth() &&
          currentYear === today.getFullYear()
        ) {
          cell.classList.add("today");
        }

        /* Event Highlight */
        let d = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
        let matchedEvent = events.find((e) => e.date === d);

        if (matchedEvent) {
          cell.classList.add("event-day");
          /* Click Event */
          cell.style.cursor = "pointer";
          cell.onclick = () => {
            showEventDetail(matchedEvent);
          };
        }
        date++;
      }
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
}

/* =========================
Render Events Table
========================= */

function renderEvents() {
  const tbody = document.getElementById("eventsTable");

  events.forEach((event) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${event.title}</td>
<td>${formatDate(event.date)}</td>
<td>${event.location}</td>`;

    row.onclick = () => {
      showEventDetail(event);
    };

    tbody.appendChild(row);
  });
}

/* =========================
Show Detail
========================= */

function showEventDetail(event) {
  const box = document.getElementById("eventDetail");

  if (!event.detail) {
    box.classList.add("hidden");
    return;
  }

  box.classList.remove("hidden");

  box.innerHTML = `
<h3>
3rd Annual Munchies at Nocturnus
</h3>

<h4>
Arts & Sciences Gathering + Community Feast
</h4>

<p>
<strong>Date & Time:</strong>
Saturday, April 18, 2026 —
Begins at 1:00 PM
</p>

<p>
<strong>Location:</strong>
Beverly S. Sheffield Northwest District Park,
Austin, Texas
</p>

<p>
Munchies at Nocturnus is a relaxed
Arts & Sciences gathering combined
with a shared community feast.
Bring your craft, bring a dish
to share, and enjoy the day.
</p>

<p>
<strong>Food Rule:</strong>
All food items must include
a complete ingredient list
for allergy awareness.
</p>

<ul>
<li>Cooking</li>
<li>Garb</li>
<li>Art (2D & 3D)</li>
<li>Crafting & Construction</li>
<li>Smith</li>
<li>Open Bardic</li>
</ul>

`;
}

/* =========================
Date Format
========================= */

function formatDate(dateStr) {
  const d = new Date(dateStr);

  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}
