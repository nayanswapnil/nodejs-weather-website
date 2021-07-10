const request = require('postman-request');

const forecast = (latitude, longitude, weather) => {
    const url = 'http://api.weatherstack.com/current?access_key=a004fed4283d2a5461d4532aa0854a5b&query=' + latitude + ',' + longitude + '&units=m';
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            weather('Unable to connect to weather service.');
        }
        else if(body.success === false){
            weather('Invalid search query.')
        }
        else{
            weather(undefined, {
                location: body.location.name,
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLikeTemperature: body.current.feelslike
            });
        }
    });
};

module.exports = forecast;