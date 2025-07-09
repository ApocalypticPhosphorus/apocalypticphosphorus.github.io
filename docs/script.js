// Reference the loading message element
const loadingMessage = document.getElementById("loading-message");

async function fetchStatus() {
  try {
    const res = await fetch('https://helicopter-tracker-backend.onrender.com/status');
    const data = await res.json();

    const table = document.getElementById('helicopter-table');
    table.innerHTML = '';

    loadingMessage.style.display = "none";

    data.forEach(entry => {
      const row = document.createElement('tr');

      const stationCell = document.createElement('td');
      stationCell.textContent = entry.station;
      row.appendChild(stationCell);

      const tailCell = document.createElement('td');
      tailCell.textContent = entry.tail;
      row.appendChild(tailCell);

      const statusCell = document.createElement('td');
      statusCell.textContent = entry.status;

      // Assign color class based on status
      statusCell.className = 'status ' + entry.status.toLowerCase().replace(' ', '-');
      row.appendChild(statusCell);

      table.appendChild(row);
    });

    const now = new Date();
    document.getElementById('last-updated').textContent =
      'Last updated: ' + now.toLocaleTimeString();
  } catch (err) {
    console.error("Error fetching status:", error);
    loadingMessage.textContent = "Failed to load data from server.";
    loadingMessage.style.color = "red";
  }
}

fetchStatus();
setInterval(fetchStatus, 120000);