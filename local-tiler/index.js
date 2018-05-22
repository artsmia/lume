import 'babel-polyfill'
import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import chalk from 'chalk'
import multer from 'multer'
import localImage from './offline'

const upload = multer()

const server = express()

let port = process.env.LOCAL_TILE_PORT

server.set('port', port)

// let corsOptions = {
//   origin: [
//     /http:\/\/localhost:3000.*/,
//   ]
// }
server.use(cors(), bodyParser.json())

server.use('/static', express.static('local-store'))

server.use('/image', upload.single('file'), localImage)

server.listen(server.get('port'), () => {
  console.log(`Local Tile API is running at ${process.env.LOCAL_TILE_URL}`)
})
