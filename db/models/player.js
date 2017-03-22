'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const Sequelize = require('sequelize')
const db = require('APP/db')

const Player = db.define('player', {
    name: Sequelize.STRING,
    password: Sequelize.STRING
}, {})

module.exports = Player