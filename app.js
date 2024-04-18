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
});

app.post('/results',(req, res) => {
  //Ensure that a city was entered

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Restaurant App listening on port ${port}`);
});