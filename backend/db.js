const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/expense-tracker"

const connectToMongo = () =>{
    mongoose.connect(mongoURI)
        console.log("CONNECTED TO MONGO")
}
module.exports = connectToMongo;