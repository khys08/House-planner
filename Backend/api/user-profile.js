const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define the /api/user-profile POST route
app.post('/api/user-profile', (req, res) => {
  const userProfile = req.body;
  console.log('Received user profile:', userProfile);

  // Here you can save userProfile to your database
  res.status(201).json({ message: 'Profile saved successfully', data: userProfile });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
