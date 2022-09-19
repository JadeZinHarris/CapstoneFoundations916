require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const {SERVER_PORT} = process.env

app.use(express.json())
app.use(cors())
const{seed,getChampion,createChampion,deleteChampion,getCharacter} = require('./Controller')

app.post('/champion',createChampion)
app.get('/champions',getChampion)
app.delete('/champion/:id', deleteChampion)
app.post('/seed', seed)
app.get('/characters', getCharacter)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))