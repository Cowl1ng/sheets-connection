const express = require('express')
const { default: Axios } = require('axios')
const router = express.Router()
const { GoogleSpreadsheet } = require('google-spreadsheet')
require('dotenv').config()

// Spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet(process.env.GOOGLE_DOC_ID)

// Headers for spreadsheet
const headers = [
  'MatchIDPN',
  'PlayerID',
  'Name',
  'Runout',
  'Stumped',
  'Lbw',
  'Catch',
  'Dots',
  'Wickets',
  'RunsBowling',
  'Maidens',
  'Overs',
  'Sixes',
  'Fours',
  'Balls',
  'RunsBatting',
  'MOTM',
]

const updateSheet = async (matchID, headers, matchInfo) => {
  const sheet = doc.sheetsByTitle[matchID]
  try {
    // Deleteing sheet then remaking it with new info
    await sheet.delete()
    const newSheet = await doc.addSheet({
      title: `${matchID}`,
      headerValues: headers,
    })
    const newRows = await newSheet.addRows(matchInfo)
    console.log(`Update Sheet`)
  } catch (error) {
    console.error(error)
  }
}

const createSheet = async (matchID, headers, matchInfo) => {
  console.log('Creating new sheet')
  try {
    const newSheet = await doc.addSheet({
      title: `${matchID}`,
      headerValues: headers,
    })
    console.log(`Adding rows`)
    const newRows = await newSheet.addRows(matchInfo)
    console.log(`Created Sheet`)
  } catch (error) {
    console.error(error)
  }
}

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
