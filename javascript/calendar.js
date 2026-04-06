/* =========================
Events Data
========================= */
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

// function renderCalendar() {
//   updateSelectedMonthTitle();
//   document.getElementById("yearDisplay").textContent = currentYear;

//   const firstDay = new Date(currentYear, currentMonth, 1).getDay();
//   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
//   const tbody = document.getElementById("calendarBody");

//   tbody.innerHTML = "";
//   let date = 1;

//   for (let i = 0; i < 6; i++) {
//     let row = document.createElement("tr");
//     for (let j = 0; j < 7; j++) {
//       let cell = document.createElement("td");
//       if (i === 0 && j < firstDay) {
//         cell.textContent = "";
//       } else if (date > daysInMonth) {
//         break;
//       } else {
//         cell.textContent = date;

//         /* Today Highlight */
//         const today = new Date();

//         if (
//           date === today.getDate() &&
//           currentMonth === today.getMonth() &&
//           currentYear === today.getFullYear()
//         ) {
//           cell.classList.add("today");
//         }

//         /* Event Highlight */
//         let d = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
//         let matchedEvent = data.find((e) => e.date === d);

//         if (matchedEvent) {
//           cell.classList.add("event-day");
//           /* Click Event */
//           cell.style.cursor = "pointer";
//           cell.onclick = () => {
//             showEventDetail(matchedEvent);
//           };
//         }
//         date++;
//       }
//       row.appendChild(cell);
//     }
//     tbody.appendChild(row);
//   }
// }


/**
 * Renders the calendar with a fixed 7-row structure.
 * This ensures the calendar height remains consistent across all months.
 */
function renderCalendar() {
  updateSelectedMonthTitle();
  document.getElementById("yearDisplay").textContent = currentYear;

  // Get the starting day of the week (0-6) and total days in the current month
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const tbody = document.getElementById("calendarBody");

  tbody.innerHTML = ""; // Clear existing rows
  let date = 1;

  // Outer loop: Fixed to 6 rows
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");

    // Inner loop: 7 days per week
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("td");

      if (i === 0 && j < firstDay) {
        // Empty cells for days before the 1st of the month
        cell.textContent = "";
      } else if (date > daysInMonth) {
        // Empty cells for days after the month ends
        cell.textContent = ""; 
        // Note: No 'break' used here to ensure all 7 rows/cells are created
      } else {
        cell.textContent = date;

        /* Highlight Current Date (Today) */
        const today = new Date();
        if (
          date === today.getDate() &&
          currentMonth === today.getMonth() &&
          currentYear === today.getFullYear()
        ) {
          cell.classList.add("today");
        }

        /* Check and Highlight Events */
        // Formats date as YYYY-MM-DD for comparison
        let d = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
        let matchedEvent = data.find((e) => e.date === d);

        if (matchedEvent) {
          cell.classList.add("event-day");
          cell.style.cursor = "pointer";
          
          // Click event to show details
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
Show Detail
========================= */

function showEventDetail(event) {
  const box = document.getElementById("eventDetail");

  box.classList.remove("hidden");

  box.innerHTML = `
<h3>
${event.title || ""}
</h3>
<h4>
${event.subtitle || ""}
</h4>
<p>
<strong>Date & Time:</strong>
${event.date || "N/A"} - ${event.time || "N/A"}
</p>
<p>
<strong>Location:</strong>
${event.fullLocation || "N/A"}
</p>
<p>
${event.description || ""}
</p>
<p>
<strong>Food Rule:</strong>
${event.foodRule || "N/A"}
</p>
<ul>
${event.categories?.map((c) => `<li>${c}</li>`).join("") || "No categories"}
</ul>
`;
}

function renderEvents() {
  const tbody = document.getElementById("eventsTable");

  tbody.innerHTML = "";

  data.forEach((event) => {
    const row = document.createElement("tr");

    row.innerHTML = `
<td>${event.title}</td>
<td>
${formatDate(event.date)}
</td>
<td>${event.location}</td>
`;
    /* Row Click */
    row.onclick = () => {
      showEventDetail(event);
    };
    tbody.appendChild(row);
  });
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
