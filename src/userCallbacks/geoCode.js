const request = require('postman-request');

const geoCode = (placeName, requestCoordinates) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(placeName) + '.json?limit=1&access_token=pk.eyJ1IjoibmF5YW5zd2FwbmlsIiwiYSI6ImNrcHk3dnZybjAzdGgyeG84cWJvb2RmY20ifQ.iUPaL8mnpRBaMxuAELKV6g';
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            requestCoordinates('Unable to connect to weather service.', undefined);
        }
        else if(body.message === 'Not Found' || body.features.length === 0){
            requestCoordinates('Invalid search query.', undefined);
        }
        else{
            requestCoordinates(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
            });
        }
    });
};

module.exports = geoCode;