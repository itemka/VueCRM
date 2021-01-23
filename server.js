import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import compression from 'compression'
import { connectToFirebase } from './src/utils/helper'

dotenv.config('./env')

const PORT = process.env.PORT || 3000
const firebase = connectToFirebase(process.env)
const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(compression())

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

function start() {
  firebase.auth(() => {
    app.listen(PORT, (err) => {
      if (err) throw err
    
      console.log('> Server started')
    })
  })
}

start();
