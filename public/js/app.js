const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.innerText = "Loading";
    messageTwo.innerText = "";
    const location = search.value;
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.innerText = data.error;
                messageTwo.innerText = "";
            }
            else{
                messageOne.innerText = 'location: ' + location.toUpperCase();
                messageTwo.innerHTML = 'Description: ' + data.description + '<br>' + 'Temperature: ' + data.temperature + '°C' + '<br>' + 'Feels Like Temperature: ' + data.feelsLikeTemperature + '°C' + '<br>' + 'Humidity: ' + data.humidity + '%';
            }
        });
    }); 
    search.value = "";
});