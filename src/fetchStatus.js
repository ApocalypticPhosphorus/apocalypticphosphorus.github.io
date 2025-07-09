const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const helicopters = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/helicopters.json'), 'utf-8')
);

let statusData = [];

async function fetchStatus() {
  const results = [];

  for (const heli of helicopters) {
    const reg = heli.tail.toUpperCase().trim();
  
    try {
      // Note: Removed '.json' at the end of the URL as you mentioned
      const res = await fetch(`https://api.adsb.lol/v2/registration/${reg}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
  
      const data = await res.json();
  
      if (data.ac && data.ac.length > 0) {
        const aircraft = data.ac[0];
        const altitude = aircraft.alt_baro || 0;
        const groundspeed = aircraft.gs || 0;
        const status = (altitude > 10 || groundspeed > 5) ? 'Flying' : 'On Ground';
  
        results.push({
          station: heli.station,
          tail: heli.tail,
          status,
          altitude
        });
      } else {
        // No data means aircraft is on the ground
        results.push({
          station: heli.station,
          tail: heli.tail,
          status: 'On Ground',
          altitude: 0
        });
      }
    } catch (err) {
      console.error(`Failed to fetch for ${heli.tail}:`, err.message);
      results.push({
        station: heli.station,
        tail: heli.tail,
        status: 'Unknown',
        altitude: null
      });
    }
  }

  statusData = results;
}

function getStatusData() {
  return statusData;
}

setInterval(fetchStatus, 120000); // every minute
fetchStatus(); // initial load

module.exports = {
  getStatusData
};
