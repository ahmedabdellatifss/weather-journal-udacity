/* Global Variables */
const btn = document.getElementById('generate');

// Personal API Key for OpenWeatherMap API
const apiKey = ',&appid=549ef0caa0aa7d0c55fa67cdda180c36&units=imperial';

// bse url to retrive data by zip code
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// URL for sever to post data in it
const server = "http://localhost:8000";

// Add event listener to button
btn.addEventListener('click', generateData)

function generateData(){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    
    // get weather data from api
    getWeather(baseUrl, zipCode, apiKey)
    
    .then((data)=>{
            //console.log(data);
            // send data to server to save it
        postData("/add", {date:d, temp:data.main.temp, userFeeling: feelings});
        // Update UI
        retrieveData();
    });
        
}        

// function to post data into server
const  postData = async(url='', info={})=>{
    const res = await fetch(url, {
        method:"POST",
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info)
    });
    try{
        const newData = await response.json();
        //console.log(newData)
        return newData;
    }catch(error){
        console.log(error);
    }
}
// get weather function 
const getWeather  = async(base, zip, key)=>{
    const res = await fetch(base+zip+key)
    try{
        const data =await res.json();
        return data;
    }catch(error){
        console.log("error",error);
    }
}


// update UI
const retrieveData = async () =>{
    const request = await fetch(server +'/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    //console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML ="Temperatuer: "+ Math.round(allData.temp)+ ' degrees';
    document.getElementById('content').innerHTML ="I feel "+ allData.feelings;
    document.getElementById("date").innerHTML ="Date: "+allData.date;
    }
    catch(error) {
        console.log("error", error);
      // appropriately handle the error
    }
}






