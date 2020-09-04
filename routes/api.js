const express = require('express')
const { default: Axios } = require('axios')
const router = express.Router()
require('dotenv').config()

// @route     GET api
// @desc      GET upcoming match information
// @access    Public

router.get('/', async (req, res) => {
  const { apiKey } = req.query
  try {
    const response = await Axios.get(
      `https://cricapi.com/api/matchCalendar?apikey=${process.env[apiKey]}`
    )
    res.json(response.data)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// @route     GET api/stats
// @desc      GET get stats for 1 game
// @access    Public

router.get('/squad', async (req, res) => {
  const { matchID, apiKey } = req.query
  try {
    const response = await Axios.get(
      `https://cricapi.com/api/fantasySummary?apikey=${process.env[apiKey]}&unique_id=${matchID}`
    )
    res.json(response.data)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
  res.json(response.data)
})

// Export router for use in server.js
module.exports = router
