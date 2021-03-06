const express = require('express')
const { default: Axios } = require('axios')
const router = express.Router()
require('dotenv').config()

// @route     GET api
// @desc      GET upcoming match information
// @access    Public

router.get('/', async (req, res) => {
  const { apiKey } = req.query
  console.log(apiKey)
  console.log(`APIKEY: ${process.env[apiKey]}`)
  try {
    const response = await Axios.get(
      `https://cricapi.com/api/matches?apikey=${process.env[apiKey]}`
    )
    res.json(response.data)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }

  // Axios({
  //   method: 'GET',
  //   url: 'https://dev132-cricket-live-scores-v1.p.rapidapi.com/matchseries.php',
  //   headers: {
  //     'content-type': 'application/octet-stream',
  //     'x-rapidapi-host': 'dev132-cricket-live-scores-v1.p.rapidapi.com',
  //     'x-rapidapi-key': 'a1a12df252msh299c4c412fcff8bp11e975jsnb50b0107dd20',
  //     useQueryString: true,
  //   },
  //   params: {
  //     seriesid: '2514',
  //   },
  // })
  //   .then((response) => {
  //     res.json(response.data)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
})

// @route     GET api/stats
// @desc      GET get stats for 1 game
// @access    Public

router.get('/stats', async (req, res) => {
  const { matchID, apiKey } = req.query
  console.log(`MID: ${matchID}`)
  try {
    const response = await Axios.get(`https://cricket.sportmonks.com/api/v2.0/fixtures/${matchID}?api_token=${process.env[apiKey]}&include=localteam,visitorteam,bowling.bowler,batting.result,lineup,balls`)
    // console.log(`PL: ${JSON.stringify(response.data)}`)
    payload = { matchStats: response.data}
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
