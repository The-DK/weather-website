const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/008d23ef5e494d60e417115a18147520/" + latitude + "," + longitude
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect to service.", undefined)
        } else if(body.error) {
            callback("Incorrect/Incomplete coordinates given.", undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.")
        }
    })
}

module.exports = forecast