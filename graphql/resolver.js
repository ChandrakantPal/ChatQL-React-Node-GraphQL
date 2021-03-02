const bcrypt = require('bcryptjs')
const { UserInputError } = require('apollo-server')

const { User } = require('../models')

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll()
        return users
      } catch (err) {
        console.log(err)
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      const { username, email, password, confirmPassword } = args
      let errors = {}
      try {
        // validate input data
        if (email.trim() === '') errors.email = 'email must not be empty'
        if (username.trim() === '')
          errors.username = 'username must not be empty'
        if (password.trim() === '')
          errors.password = 'password must not be empty'
        if (confirmPassword.trim() === '')
          errors.confirmPassword = 'repeate password must not be empty'

        if (password !== confirmPassword)
          errors.confirmPassword = 'passwords must match'

        // // check if username / email exist
        // const userByUsername = await User.findOne({ where: { username } })
        // const userByEmail = await User.findOne({ where: { email } })

        // if (userByUsername) errors.username = 'Username is taken'
        // if (userByEmail) errors.email = 'Email is taken'

        if (Object.keys(errors).length > 0) {
          throw errors
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 6)

        // create user
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
        })

        // return user
        return user
      } catch (err) {
        console.log(err)
        if (err.name === 'SequelizeUniqueConstraintError') {
          err.errors.forEach(
            (error) => (errors[error.path] = `${error.path} is already taken`)
          )
        } else if (err.name === 'SequelizeValidationError') {
          err.errors.forEach((error) => (errors[error.path] = error.message))
        }
        throw new UserInputError('Bad input', { errors })
      }
    },
  },
}
