let latitude = 0
let longitude = 0

pegarLocalizacaoAtual()

function pegarLocalizacaoAtual() {
    navigator.geolocation.getCurrentPosition(function(position) {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        pegarAPI()
    }, 
    function(error) {
        document.querySelector('main').innerHTML = `
        <div class="input">
            <h1>Informe sua Latitude/Longetude:</h1>
            <div>
                <label for="input-latitude">Latitude:</label>
                <input type="text" placeholder="Latitude" id="input-latitude">
            </div>
            <div>
                <label for="input-latitude">Longetude:</label>
                <input type="text" placeholder="Longetude" id="input-longitude">
            </div>
            <button onclick="informarLocalizacao()">Confirmar</button>
        </div>
        `
    })
}

function informarLocalizacao() {
    latitude = parseFloat(document.getElementById("input-latitude").value)
    longitude = parseFloat(document.getElementById("input-longitude").value)
    if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180) {
        document.querySelector('main').innerHTML = `
        <h1 id="cidade">Cidade:</h1>
        <h1 id="temperatura">Temperatura:</h1>
        <div class="condicoes-clima">
            <p id="sensacaoTermica">Sensação térmica:<span></span></p>
            <p id="tempMin">Temperatura mínima:<span></span></p>
            <p id="tempMax">Temperatura máxima:<span></span></p>
        </div>
        `
        pegarAPI()
    } else {
        alert('Não foi possível encontrar esse valor! Por favor digite novamente.')
    }
}
function modificarHTML(response) {
    let API = response.data
    document.getElementById("cidade").innerHTML = API.name
    document.getElementById("temperatura").innerHTML = `${(parseInt(API.main.temp) - 273)}°`
    document.querySelector("#sensacaoTermica span").innerHTML = `${(parseInt(API.main.feels_like) - 273)}°`
    document.querySelector("#tempMin span").innerHTML = `${(parseInt(API.main.temp_min) - 273)}°`
    document.querySelector("#tempMax span").innerHTML = `${(parseInt(API.main.temp_max) - 273)}°`
    
}

function pegarAPI() {
    let promise = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8ca7f91913b5e93d208f4b86f7143807`)
    promise.then(modificarHTML)
    promise.catch(error => {console.log(error.response)})
}

