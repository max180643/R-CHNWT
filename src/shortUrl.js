import { nanoid } from 'nanoid'

import { firestore } from 'firebase/app'

require('dotenv').config()

require('firebase/firestore')

const firebase = require('firebase/app')

const config = process.env.FIREBASE

const shortUrl = 'shortUrl'

const maxLimit = 4

let countLimit = 0

firebase.initializeApp(JSON.parse(config))

const urlValid = (url) => {
  const pattern = new RegExp('^(https?:\\/\\/)?'
  + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
  + '((\\d{1,3}\\.){3}\\d{1,3}))'
  + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
  + '(\\?[;&a-z\\d%_.~+=-]*)?'
  + '(\\#[-a-z\\d_]*)?$', 'i')
  return !!pattern.test(url)
}

const genID = async () => {
  if (countLimit > maxLimit) return 'timeout'
  countLimit += 1
  const id = nanoid(5)
  const isExist = firestore().collection('path').doc(id).get()
    .then(doc => (!doc.exists ? id : genID()))
  return isExist
}

export const genShortUrl = async (url) => {
  countLimit = 0

  if (!urlValid(url)) return { status: 'failure', message: 'url pattern is invalid', code: 400 }

  const id = await genID()

  const result = (id === 'timeout') ? { status: 'failure', message: 'timeout', code: 500 } : await firestore()
    .collection('path')
    .doc(id)
    .set({
      fullUrl: url,
      created: firestore.FieldValue.serverTimestamp(),
    })
    .then(() => ({
      status: 'success',
      id,
      shortUrl: `https://r.chnwt.dev/${id}`,
      fullUrl: url,
      code: 201,
    }))

  return result
}

export const getFullUrl = async (id) => {
  const result = await firestore().collection('path').doc(id).get()
    .then(doc => ((doc.data() === undefined) ? 'notFound' : doc.data().fullUrl))
  return result
}

export default shortUrl
