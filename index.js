const express = require('express');
const morgan = require('morgan')
const Contact = require('./models/contacts');

const app = express()


morgan.token('type', function (req, res) { return JSON.stringify(res.body) })


morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(express.json())
app.use(morgan(':method :url :body'))



const isExist = (arr, name) => {
  const found = arr.find(arrItem => arrItem.name === name) ? true : false
  return found;
}

app.get('/api/persons',(req,res)=>{
    contact.find({}).then(persons=>{
      res.json(persons)
    })

})

app.get('/api/info',(req,res)=>{
    const date = new Date().toLocaleDateString()
    
   const contacts = persons.length
   res.send(`this phoonebook has ${contacts} contacts 
    ${date}
    `)
   
})

app.get('/api/persons/:id',(req,res)=>{
Contact.findById(req.params.id).then(contact=>{res.json(contact)})
})

app.delete('/api/persons/:id',(req,res)=>{
    const id = req.params.id
    persons=persons.filter(person=>person.id!==id)
    res.status(204).end()
})

app.post('/api/persons',(req,res)=>{
 const body = req.body;

if(body.name===undefined){
 return res.status(400).json({error : 'name missing'})
}
if(body.number===undefined){
  return res.status(400).json({error : 'number  missing'})
 }
const contact = new Contact({
  name : body.name,
  number :body.number
})
contact.save().then(savednote=>{
  res.json(savednote)
})

})

const port= 3001
app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
    
})