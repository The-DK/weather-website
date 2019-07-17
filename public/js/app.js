const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const errorLoc = document.querySelector(".errorLocation")
const showLoc = document.querySelector(".showLocation")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = search.value
    showLoc.innerHTML = "Loading..."
    errorLoc.innerHTML = ""
    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                showLoc.innerHTML = ""
                errorLoc.innerHTML = data.error                
                console.log(data.error)
            } else {
                //let output = data.forecast + "<br>" + data.forecast
                showLoc.innerHTML = data.forecast + "<br>" + data.location                
                console.log("Location: ", data.location)
                console.log("Forecast: ", data.forecast)
            }
        })
    })
    console.log(location)
})