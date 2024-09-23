
const mongoose = require('mongoose');
require('dotenv').config()


const url = process.env.MONGODB_URI;


console.log('connection to url', url)


mongoose.set('strictQuery',false)
mongoose.connect(url).then(result =>{
    console.log('conneted to database');
    
})
.catch(error=> {
    console.log('database connection failed',error.message);
    
})

const contactSchema = new mongoose.Schema(
  { name : String,
    number : String,
  }
)


contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)