import { genShortUrl, getFullUrl } from './shortUrl'

const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 5555

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/url', async (req, res) => {
  const {
    status, message, id, shortUrl, fullUrl, code,
  } = await genShortUrl(req.body.url)
  res.send({
    status,
    message,
    id,
    shortUrl,
    fullUrl,
  },
  code)
})

app.get('/:shortUrl', async (req, res) => {
  const fullUrl = await getFullUrl(req.params.shortUrl)

  if (fullUrl === 'notFound') return res.sendStatus(404)

  res.redirect(fullUrl)
})

app.listen(port, () => console.log('Server running at port %d.', port))
