import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import db from './db'


const server = express()

let port = process.env.PORT || 5000

server.set('port', port)

server.use(cors())

server.use(bodyParser.json())


server.listen(server.get('port'), ()=>{
  console.log(`Server is running at port ${server.get('port')}`)
})
