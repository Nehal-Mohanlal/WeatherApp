//so we can protect info like api keys, auth tokens etc. 
require("dotenv").config()

const { INSPECT_MAX_BYTES } = require("buffer")
// load module
const express = require("express") 
// instaniate express 
const app = express() 
// load module
const https = require("https")

// get a dynamic port
const port = 3010 

// so program knows to look in views folder, and knows to look for extension ejs
app.set("view engine", "ejs")
// middle ware so we can use app.post with forms 
app.use(express.urlencoded({extended:true}))

// all tempdata will be stored here as objects
let tempData = []

// get the index page
app.get("/" , (req,res)=>{
    res.render("index")
})

// where temperature and related data will be stored
app.get("/temp", (req,res)=>{
    res.render("temp" , {tempData}) 
})


// so we can post data to webpage to server, then back to webpage 
app.post("/", (req,res)=>{

    let cityName = req.body.CN
   // console.log(cityName)

     
    const query = cityName
    const apiKey = process.env.API_key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
    https.get(url, (response)=>{
        console.log(response.statusCode)

        response.on("data", (data)=>{
           let weatherData =  JSON.parse(data)
            //console.log(weatherData)

           let Name =weatherData.name
           let temp = weatherData.main.temp 
           let description = weatherData.weather[0].description 
           let icon = weatherData.weather[0].icon 
        
           let newTemp= {Place:Name, Temp:temp} 

           tempData.push(newTemp) 
          
           for(let i =0; i<tempData.length; i++){
                console.log(tempData[i])
           }

           res.redirect("temp")
           res.send()
        })
    })

 

})




/* res.write("the Temperature in " +query+ "is" + temp) 
res.write("\nthe description is " + description) 
res.write(`<img src=${image} >`) 
let image = `https://openweathermap.org/img/wn/${icon}@2x.png`


 */



//standard boiler plate setting up server 
app.listen(port|| 3012, (e)=>{
    if(e){
        console.log("There was an error establsihing server")
    }
    else{
        console.log("server is running on port " + port) 
    }

})