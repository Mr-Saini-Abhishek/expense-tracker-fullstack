const mongoose =  require('mongoose')
const {Schema} = mongoose;

const NotesSchema = new Schema({
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

text:{
    type: String,
    required: true
},
amount:{
    type: String,
    required: true
},


date:{
    type: Date,
    default: Date.now
}

})

module.exports =  mongoose.model('payment', NotesSchema);