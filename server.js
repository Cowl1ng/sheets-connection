require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet')

const googleDocID = process.env.GOOGLE_DOC_ID
// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet(googleDocID)

// use service account creds

const googleSheetsConnection = async (matchID) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    })

    await doc.loadInfo() // loads document properties and worksheets
    // console.log(doc.sheetsById)
    await doc.updateProperties({ title: 'IPL_IMPORT' })
    // const sheet = doc.sheetsByIndex[1] // or use doc.sheetsById[id]
    const sheets = doc.sheetsByIndex
    for (const sheet of sheets) {
      console.log(`Sheet Title: ${sheet.title}`)
    }

    // console.log(sheet.title)
    // console.log(sheet.rowCount)

    // adding / removing sheets

    // const newSheet = await doc.addSheet({ title: `${matchID}` })
    // await newSheet.delete()
  } catch (error) {
    console.error(error)
  }
}

googleSheetsConnection(1195573)
