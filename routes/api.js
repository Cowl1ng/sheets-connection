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
      `https://cricapi.com/api/matches?apikey=${process.env[apiKey]}`
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

router.get('/stats', async (req, res) => {
  const { matchID, apiKey } = req.query
  console.log(`MID: ${matchID}`)
  console.log(process.env[apiKey])
  try {
    const response = await Axios.get(
      `https://cricapi.com/api/fantasySummary?apikey=${process.env[apiKey]}&unique_id=${matchID}`
    )
    const response2 = await Axios.get(
      `https://cricapi.com/api/cricketScore?apikey=${process.env[apiKey]}&unique_id=${matchID}`
    )
    payload = { matchStats: response.data, matchScore: response2.data }
    res.json(payload)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// @route     GET api/sheet
// @desc      Send stats to spreadsheet
// @access    Public

router.get('/key', async (req, res) => {
  secrets = {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  }
  res.json(secrets)
})

// Export router for use in server.js
module.exports = router
