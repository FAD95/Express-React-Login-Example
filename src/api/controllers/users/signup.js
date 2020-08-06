'use strict'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const chalk = require('chalk')

// Cargamos nuestro modelo
const User = require('../../models/user')

// Cargamos variables de entorno
dotenv.config()

module.exports = async (req, res) => {
  const { password, passwordConfirmation, email, username } = req.body

  try {
    const userRecord = await User.findOne({ username })
    const emailRecord = await User.findOne({ email })
    if (userRecord) {
      console.log(chalk.red('Username already in use'))
      return res.status(400).json({
        status: 400,
        message: 'Username already in use',
      })
    }
    if (emailRecord) {
      console.log(chalk.red('Email already in use'))
      return res.status(400).json({
        status: 400,
        message: 'Email already in use',
      })
    }
    if (password !== passwordConfirmation) {
      // En caso que las ontraseñas no sean iguales se devuelve error 400 en la petición
      console.log(
        chalk.red('¡Las contraseñas no coinciden!. Intenta nuevamente')
      )
      return res.status(400).json({
        status: 400,
        message: '¡Las contraseñas no coinciden!. Intenta nuevamente',
      })
    }
    const newUser = User({
      // Encriptamos el password, y ese password lo pasamos a la base de datos
      password: bcrypt.hashSync(password, 10),
      email,
      username,
    })

    //Si la instancia del modelo funciona, entonces intentamos almacernar el usuario en la base de datos
    try {
      const savedUser = await newUser.save()

      //Si se guarda con exito entonces firmamos el jwt
      const token = await jwt.sign(
        { email, id: savedUser.id, username },
        process.env.AUTH_JWT_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRES_IN }
      )

      console.log(chalk.green(`User with username ${username} was created`))
      return res.status(201).json({ token })
    } catch (error) {
      console.log(chalk.red(error))
      return res.status(400).json({
        status: 400,
        message: error,
      })
    }
  } catch (error) {
    console.log(chalk.red(error))
    return res.status(400).json({
      status: 400,
      message: error,
    })
  }
}
