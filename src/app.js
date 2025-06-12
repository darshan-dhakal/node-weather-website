const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../layouts/views')
const partialsPath = path.join(__dirname, '../layouts/partials')
console.log(path.join(__dirname, '../templates'))

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directiry to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Darshan Dhakal'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    aboutText: 'About this App.',
    name: 'Darshan Dhakal'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    helpText: 'Get your help here.',
    name: 'Darshan Dhakal'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'address is not provided'
    })
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        })
      })
    }
  )
})

// console.log(req.query.address)
//   res.send({
//     forecast: 'heavily rainy',
//     address: req.query.address,
//     longitude: res.body.features[0].geometry.coordinates[0]

//   })
// })

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Darshan Dhakal',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Darshan Dhakal',
    errorMessage: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log('server is up on port 3000.')
})
