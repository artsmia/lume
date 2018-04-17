import "babel-polyfill"
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import chalk from 'chalk'
import multer from 'multer'
import localImage from './offline'

const upload = multer()

const server = express()

let port = process.env.PORT || 3001

server.set('port', port)

// let corsOptions = {
//   origin: [
//     /http:\/\/localhost:3000.*/,
//   ]
// }
server.use(
  cors(),
  bodyParser.json(),
)

server.use('/static', express.static('local-store'))


server.use(
  "/upload",
  upload.single("file"),
  localImage
)



server.listen(server.get('port'), ()=>{
  console.log(`Server is running at port ${server.get('port')}`)
})
