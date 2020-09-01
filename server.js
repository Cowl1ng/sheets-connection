const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello World'))

// Define Routes
app.use('/api', require('./routes/api'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
