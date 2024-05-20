const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true,
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true,
    },
  ];

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const note = notes.find(x => x.id == req.params.id)
  if(note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter(x => x.id !== Number(req.params.id))

  res.status(204).end()
})

const generateId = () => {
  const id = notes.length ? Math.max(...notes.map(x => x.id)) : 0
  return id + 1
}

app.post('/api/notes/', (req, res) => {
  const {content, important} = req.body

  if(!content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    id: generateId(),
    content,
    important: important ?? false
  }
  
  notes = notes.concat(note)
  res.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})