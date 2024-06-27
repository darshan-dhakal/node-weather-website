const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  request('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+latitude+','+longitude+'?unitGroup=metric&key=6TKL6327GNXKB76TAJQATA5RX&contentType=json', {json: true}, (error, { body }) => {
     if(error) {
        callback('unable to connect to the internet...', undefined)
     } else if(body.error){
        callback('unable to find location', undefined)
     } else {
        callback(undefined,
           body.description + 'It is currently '+ body.currentConditions.temp + ' degrees but feels like '+ body.currentConditions.feelslike+' degrees.'
        )
     }
  })
}

module.exports = forecast