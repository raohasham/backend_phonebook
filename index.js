const express = require('express');
const morgan = require('morgan')
const Contact = require('./models/contacts');

const app = express()


morgan.token('type', function (req, res) { return JSON.stringify(res.body) })


morgan.token('body', req => {
  return JSON.stringify(req.body)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(express.json())
app.use(morgan(':method :url :body'))



app.get('/api/persons',(req,res)=>{
    Contact.find({}).then(persons=>{
      res.json(persons)
    })

})

app.get('/api/info',(req,res)=>{
    const date = new Date().toLocaleDateString()
    
   const contacts = persons.length
   res.send(`this phoonebook has ${contacts} contacts ${date}`)
   
})

app.get('/api/persons/:id',(req,res)=>{
Contact.findById(req.params.id).then(contact=>{
  if(contact){res.json(contact)}
else{res.status(404).end()}})
.catch(err=>{
  console.log(err);
  res.status(500).send({error : 'malformated id'})
  
})
})

app.delete('/api/persons/:id',(req,res,next)=>{
    const id = req.params.id
    Contact.findByIdAndDelete(id)
    .then(result => {res.status(204).end()})
    .catch(err => next(err))
    res.status(204).end()
})

app.post('/api/persons',(req,res)=>{
 const body = req.body;
 
 if(body===undefined){
  return res.status(400).json({error : 'content missing'})
 }
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
contact.save().then(savedcontact=>{
  res.json(savedcontact)
})

})



app.use(errorHandler);
const port= 3001
app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
    
})