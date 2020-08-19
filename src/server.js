import { genShortUrl, getFullUrl } from './shortUrl'

const express = require('express')

const bodyParser = require('body-parser')

const cors = require('cors')

const app = express()

const port = process.env.PORT || 5555

app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res) => {
  res.send({
    status: 'success',
    response: 'Please go to https://github.com/max180643/R-CHNWT for API usage.',
  },
  200)
})

app.post('/url', async (req, res) => {
  const {
    status, response, id, shortUrl, fullUrl, code,
  } = await genShortUrl(req.body.url)
  res.send({
    status,
    response,
    id,
    shortUrl,
    fullUrl,
  },
  code)
})

app.get('/:shortUrl', async (req, res) => {
  const fullUrl = await getFullUrl(req.params.shortUrl)

  if (fullUrl === 'notFound') {
    return res.send({
      status: 'failure',
      response: 'ID not found.',
    },
    404)
  }

  res.redirect(fullUrl)
})

app.get('*', (req, res) => {
  res.send({
    status: 'failure',
    response: 'Route not found, Please go to https://github.com/max180643/R-CHNWT for API usage.',
  },
  404)
})

app.listen(port, () => console.log('Server running at port %d.', port))
