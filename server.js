require("dotenv").config()

const express = require("express") 

const app = express() 
const https = require("https")


const port = 3010 

app.use(express.urlencoded({extended:true}))

app.get("/" , (req,res)=>{

    res.sendFile(__dirname + "/views/index.html")

   
})


app.post("/", (req,res)=>{

    let cityName = req.body.CN
    console.log(cityName)

     
const query = cityName
    const apiKey = process.env.API_key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
    https.get(url, (response)=>{
        console.log(response.statusCode)

        response.on("data", (data)=>{
           let weatherData =  JSON.parse(data)
            //console.log(weatherData)

           let temp = weatherData.main.temp 
           let description = weatherData.weather[0].description 
           let icon = weatherData.weather[0].icon 
           let image = `https://openweathermap.org/img/wn/${icon}@2x.png`

           res.write("the Temperature in " +query+ "is" + temp) 
           res.write("\nthe description is " + description) 
           res.write(`<img src=${image} >`) 
           console.log(temp) 
           console.log(description) 
           res.send()
        })
    })

 

})







app.listen(port, (e)=>{
    if(e){
        console.log("There was an error establsihing server")
    }
    else{
        console.log("server is running on port " + port) 
    }

})