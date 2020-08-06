const express = require('express')
const session = require('express-session')
const createError = require('http-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const flash = require('connect-flash')
require('dotenv').config()

const usersRoutes = require('./src/api/routes/users')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// const whitelist = ['http://localhost:3002']
// const corsOptions = {
//   origin: function (origin, cb) {
//     if (whitelist.indexOf(origin) !== -1) {
//       cb(null, true)
//     } else {
//       cb(new Error('Not allowed by cors'))
//     }
//   },
// }

// Para permitir el acceso desde diferentes rutas
app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser('secret'))
app.use(
  session({
    secret: 'mysecretkey_fad',
    resave: false,
    saveUninitialized: false,
  })
)
app.use(flash())

// // Para enviar mensajes de los errores en el servidor hacia el cliente
// app.all('/', function (req, res) {
//   req.flash('test', 'it worked')
//   res.redirect('/test')
// })

// app.all('/test', function (req, res) {
//   res.send(JSON.stringify(req.flash('test')))
// })

app.use(express.static(path.join(__dirname, 'client/dist')))

app.use('/api/v1/users', usersRoutes)

mongoose.set('useCreateIndex', true)

mongoose.connect(process.env.MONGO_DB_URI_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    status: err.status,
    message: err.message,
  })
})

module.exports = app
