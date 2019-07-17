const path = require("path")
const express = require("express")
const app = express()
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const port = process.env.PORT || 3000

//Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine  and views location
 app.set("views", viewsPath)
 app.set("view engine", "hbs")
 hbs.registerPartials(partialsPath)

 //Setup static directory (i.e. 'public') to serve static contents
 app.use(express.static(publicDirectoryPath))

//ROUTES
app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Dkakkar"
    })
})
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Dkakkar"
    })
})
app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "This is some helpful text.",
        title: "Help",
        name: "Dkakkar"
    })
})
app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Must provide 'address' query"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })    
})
app.get("/products", (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "Must provide 'search' query"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get("/weather/*", (req, res) => {
    res.render("404Error", {
        title: "Weather not found here!",
        name: "Dkakkar",
        message: "Page not found."
    })
})
app.get("/help/*", (req, res) => {
    res.render("404Error", {
        title: "404 Error",
        name: "Dkakkar",
        message: "Help article not found."
    })
})
app.get("*", (req, res) => {
    res.render("404Error", {
        title: "404 Error",
        name: "Dkakkar",
        message: "Page not found."
    })
})

// app.com
// app.com/home
// app.com/about

app.listen(port, () => {
    console.log("Server is up on port " + port)
})