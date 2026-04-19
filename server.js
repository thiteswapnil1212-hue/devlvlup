const express = require('express');
const path = require('path');

const app = express();
const PORT = 4000;
const frontendPath = path.join(__dirname, 'frontend');

app.use(express.static(frontendPath));

app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
