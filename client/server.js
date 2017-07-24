const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/:groupTitle', (req, res) => {
    const actualPage = '/group'
    const {groupTitle} = req.params
    const queryParams = {
      groupTitle,
    }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/:groupTitle/story/:storyId', (req, res) => {
    const actualPage = '/story'
    const {groupTitle, storyId} = req.params
    const queryParams = {
      groupTitle,
      storyId
    }

    app.render(req, res, actualPage, queryParams)
  })


  server.get('/:groupTitle/:itemId/:tab', (req, res) => {
    const actualPage = '/item'
    const {groupTitle, itemId, tab} = req.params
    const queryParams = {
      groupTitle,
      itemId,
      tab
    }

    app.render(req, res, actualPage, queryParams)
  })



  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
