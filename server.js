// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server =app.listen(port, listening);

// Function to test the server is run correctly
function listening(){
    console.log(`"server running at: http://localhost:${port}`);
}


 // Get Route
 app.get('/all', function(req, res){
    res.status(200).send(projectData);
});

//  Send Route
app.post('/add', (req, res)=>{
    //console.log(req.body);
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        feelings: req.body.userFeeling
    }
})
