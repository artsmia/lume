import 'babel-polyfill'
import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import chalk from 'chalk'
import createGithubIssue from './github/issue'
import apphook from './github/apphook'

const server = express()

let port = process.env.API_PORT

server.set('port', port)

server.use(cors(), bodyParser.json())

server.use('/apphook', apphook)

server.use('/bug', createGithubIssue)

server.listen(server.get('port'), () => {
  console.log(`Lume github-bot is running at ${process.env.API_URL}`)
})
