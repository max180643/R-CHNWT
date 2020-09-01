import { genShortUrl, getFullUrl } from './shortUrl'

const express = require('express')

const bodyParser = require('body-parser')

const cors = require('cors')

const path = require('path')

const app = express()

const port = process.env.PORT || 5555

const staticPath = path.join(__dirname, '../view/build/')

app.use(bodyParser.json())

app.use(cors())

app.use('/', express.static(staticPath))

app.get('/', function(req, res) {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.post('/url', async (req, res) => {
  const {
    status, response, id, shortUrl, fullUrl, code,
  } = await genShortUrl(req.body)
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
