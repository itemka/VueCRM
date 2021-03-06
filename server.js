import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import compression from 'compression'

dotenv.config('./env')

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(compression())

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

function start() {
  app.listen(PORT, (err) => {
    if (err) throw err
  
    console.log('> Server started')
  })
}

start()
