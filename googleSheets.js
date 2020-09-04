require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet')

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

googleSheetsConnection = async (matchID, matchInfo) => {
  try {
    // Authentication for connecting to sheet
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    })
    console.log('Doc accessed')
    // Loads document properties and worksheets
    await doc.loadInfo()
    console.log('Doc loaded')
    const sheets = doc.sheetsByIndex

    // Check if sheet already exists
    sheetTitles = []
    for (const sheet of sheets) {
      sheetTitles.push(sheet.title)
    }
    const sheetExists = sheetTitles.includes(`${matchID}`)

    // If sheet exists update if not create it
    if (sheetExists) {
      updateSheet(matchID, headers, matchInfo)
    } else {
      createSheet(matchID, headers, matchInfo)
    }
  } catch (error) {
    console.error(error)
  }
}

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
