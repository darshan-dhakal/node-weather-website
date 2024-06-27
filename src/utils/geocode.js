const request = require('postman-request')

const geocode = (address, callback) =>  {
  // const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=dharan&access_token=pk.eyJ1IjoiZGFyc2hhbmRoYWthbDc3IiwiYSI6ImNseGlpdzdmcjFpOHoybHNodTFsdnBnc2YifQ.-ThqcPGUTZjbcIJU6FgyEg&limit=1'
  request('https://api.mapbox.com/search/geocode/v6/forward?q='+encodeURIComponent(address)+'&access_token=pk.eyJ1IjoiZGFyc2hhbmRoYWthbDc3IiwiYSI6ImNseGlpdzdmcjFpOHoybHNodTFsdnBnc2YifQ.-ThqcPGUTZjbcIJU6FgyEg&limit=1', {json: true}, (error, response)=>{
     if (error) {
        callback('unable to connect to internet...', undefined)
     } else if (response.body.features.length === 0) {
        callback('unable to find location. try another search...', undefined)
     } else {
        callback(undefined, {
           longitude: response.body.features[0].geometry.coordinates[0],
           latitude: response.body.features[0].geometry.coordinates[1],
           location: response.body.features[0].properties.full_address
        })
     }
  })
}

module.exports = geocode