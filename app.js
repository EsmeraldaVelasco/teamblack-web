// Import packages
const express = require('express');
const path = require('path');
const {Storage} = require('@google-cloud/storage');

  // Set the port
  const port = 8080;

  // Create instances of necessary packages
  const app = express();
  const storage=new Storage();


  // Set the identifier for the GCS bucket where the favorite file will be stored
  const bucket=storage.bucket('sp24-41200-teamblack-project-favorites');


  // Middleware
  app.use('/js', express.static(__dirname + '/public/js'));
  app.use('/css', express.static(__dirname + '/public/css'));
  app.use('/images', express.static(__dirname + '/public/images'));


// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
  console.log('Index');
});

app.post('/', async (req, res) => {
  try {
    console.log('Goinf thr');
    const city = req.body.city; // Get the city from the request body

    // Make a request to your API to fetch restaurant data based on the city
    const response = await fetch(`https://sp24-41200-teamblack-project.uc.r.appspot.com/api/v1/places/city/${city}`);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Error fetching data from API');
    }

    // Parse the JSON response
    const restaurants = await response.json();

    // Send the restaurant data as a JSON response
    res.json(restaurants);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.message);
    res.status(500).send('Internal server error');
  }
});


app.listen(port, () => {
  console.log(`Restaurant App listening on port ${port}`);
});


