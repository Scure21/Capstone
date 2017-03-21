'use strict'

const db = require('APP/db')
const Player = db.model('player')

module.exports = require('express').Router()
	.post('/', (req, res, next) =>
		Player.create(req.body)
		.then(player => res.status(201).json(player))
		.catch(next))
	.get('/:id', (req, res, next) => 
		Player.findById(req.params.id)
		.then(player => res.json(player))
		.catch(next))