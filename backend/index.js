
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db')

const app = express();
const port = 5000;
app.use(express.json())
app.use(cors())
connectToMongo();

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, ()=>{
    console.log(`LISTINIG ON PORT ${port}`)
})