const express = require('express')
const router = express.Router()

// @route     GET api/
// @desc
// @access    Public

router.get('/', async (req, res) => {
  res.json({ msg: 'API BACKEND' })
})

// Export router for use in server.js
module.exports = router
