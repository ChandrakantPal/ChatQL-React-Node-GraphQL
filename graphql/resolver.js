const bcrypt = require('bcryptjs')
const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

const { Message, User } = require('../models')
const { JWT_SECRET } = require('../config/env.json')

module.exports = {
  Query: {
    getUsers: async (_, __, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated')

        const users = await User.findAll({
          where: { username: { [Op.ne]: user.username } },
        })
        return users
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    login: async (_, args) => {
      const { username, password } = args
      let errors = {}

      try {
        if (username.trim() === '')
          errors.username = 'username must not be empty'
        if (password === '') errors.password = 'password must not be empty'

        if (Object.keys(errors).length > 0) {
          throw new UserInputError('bad input', { errors })
        }

        const user = await User.findOne({
          where: { username },
        })
        if (!user) {
          errors.username = 'user not found'
          throw new UserInputError('user not found', { errors })
        }

        const correctPassword = await bcrypt.compare(password, user.password)

        if (!correctPassword) {
          errors.password = 'incorrect username or password'
          throw new UserInputError('incorrect username or password', {
            errors,
          })
        }

        const token = jwt.sign({ username }, JWT_SECRET, {
          expiresIn: 60 * 60,
        })

        return {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token,
        }
      } catch (err) {
        console.log(err)
        throw err
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
    sendMessage: async (parent, { to, content }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated')

        const recipient = await User.findOne({ where: { username: to } })

        if (!recipient) {
          throw new UserInputError('User not found')
        } else if (recipient.username === user.username) {
          throw new UserInputError('You cant message yourself')
        }

        if (content.trim() === '') {
          throw new UserInputError('Message is empty')
        }

        const message = await Message.create({
          from: user.username,
          to,
          content,
        })
        return message
      } catch (err) {
        console.log(err)
        throw err
      }
    },
  },
}
