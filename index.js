const express = require('express');
const morgan = require('morgan')

const app = express()


morgan.token('type', function (req, res) { return JSON.stringify(res.body) })


morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(express.json())
app.use(morgan(':method :url :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



const generateId = () => {
  const randNum = Math.floor(Math.random() * 5000)
  return randNum;
}

const isExist = (arr, name) => {
  const found = arr.find(arrItem => arrItem.name === name) ? true : false
  return found;
}

app.get('/api/persons',(req,res)=>{
    res.json(persons)

})

app.get('/api/info',(req,res)=>{
    const date = new Date().toLocaleDateString()
    
   const contacts = persons.length
   res.send(`this phoonebook has ${contacts} contacts 
    ${date}
    `)
   
})

app.get('/api/persons/:id',(req,res)=>{
   const id=req.params.id;
   const person=persons.find(person=>person.id===id)
   if(person){
res.json(person)}
else{
    res.status(404).end()
}
})

app.delete('/api/persons/:id',(req,res)=>{
    const id = req.params.id
    persons=persons.filter(person=>person.id!==id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
      return res.status(400).json({
          error: "missing data"
      })
  } else if (isExist(persons, body.name) === true) {
      return res.status(400).json({
          error: "existed data"
      })
  }
  const person = {
      id: generateId(),
      name: body.name,
      number: body.number
  }
  persons = persons.concat(person)

  res.json(person)
})

const port= 3001
app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
    
})