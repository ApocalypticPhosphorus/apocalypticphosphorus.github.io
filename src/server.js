const express = require('express');
const path = require('path');
const { getStatusData } = require('./fetchStatus');

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Serve static files from "public"
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint for helicopter status
app.get('/status', (req, res) => {
  res.json(getStatusData());
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
