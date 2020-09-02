const express = require('express')
const { default: Axios } = require('axios')
const router = express.Router()

// @route     GET api
// @desc      GET squad info for a game
// @access    Public

router.get('/', async (req, res) => {
  res.send({ msg: 'Server running' })
})

// @route     GET api/squad
// @desc      GET squad info for a game
// @access    Public

router.get('/squad', async (req, res) => {
  const response = Axios.get('/https://cricapi.com/api/fantasySquad', {
    params: {
      apikey: process.env.API_KEY,
      unique_id: 1227885,
    },
  })
  res.json(response.data)
})

// Export router for use in server.js
module.exports = router
