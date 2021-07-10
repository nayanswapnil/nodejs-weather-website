const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./userCallbacks/geoCode');
const forecast = require('./userCallbacks/forecast');


const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialsDirPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsDirPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Swapnil Nayan'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Page',
        name: 'Swapnil Nayan'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpMessage: 'This is a help message',
        name: 'Swapnil Nayan'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error: 'Address must be provided!'});
    }

    geoCode(req.query.address, (error, {latitude, longitude} = {}) => {
        if(error){
            res.send({error});
        }
        else{
            forecast(latitude, longitude, (error, {description, temperature, feelsLikeTemperature} = {}) => {
                if(error){
                    res.send({error});
                }
                else{
                    res.send({
                        location: req.query.address,
                        description,
                        temperature,
                        feelsLikeTemperature 
                    });
                }
            });
        }
    });
});

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404 Page!',
        message: 'Help article not found!',
        name: 'Swapnil Nayan'
    });
});

app.get('*',(req, res) => {
    res.render('404', {
        title: '404 Page!',
        message: '404 page not found!',
        name: 'Swapnil Nayan'
    });
});

app.listen(port, () => {
    console.log('Server started on port: ' + port);
});