require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet')

const googleDocID = process.env.GOOGLE_DOC_ID
// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet(googleDocID)

// use service account creds

const main = async () => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    })

    await doc.loadInfo() // loads document properties and worksheets
    console.log(doc.title)
    await doc.updateProperties({ title: 'IPL_IMPORT' })
    const sheet = doc.sheetsByIndex[0] // or use doc.sheetsById[id]
    console.log(sheet.title)
    console.log(sheet.rowCount)

    // adding / removing sheets
    const newSheet = await doc.addSheet({ title: 'hot new sheet!' })
    // await newSheet.delete()
  } catch (error) {
    console.error(error)
  }
}

main()
