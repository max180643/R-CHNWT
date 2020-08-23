import { nanoid } from 'nanoid'

import './lib/firebase'

import { firestore } from 'firebase/app'

require('dotenv').config()

const collectionName = process.env.FIREBASE_COLLECTION_NAME

const maxLimit = 4

let countLimit = 0

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

  if (!urlValid(url)) return { status: 'failure', response: 'URL pattern is invalid.', code: 400 }

  const id = await genID()

  const myUrl = process.env.MY_URL

  let shortUrl

  if ((myUrl.includes('https://') && myUrl.slice(-1) === '/') || (myUrl.includes('http://') && myUrl.slice(-1) === '/')) {
    shortUrl = `${myUrl}${id}`
  } else if ((myUrl.includes('https://') && myUrl.slice(-1) !== '/') || (myUrl.includes('http://') && myUrl.slice(-1) !== '/')) {
    shortUrl = `${myUrl}/${id}`
  } else if ((!myUrl.includes('https://') && myUrl.slice(-1) === '/') || (!myUrl.includes('http://') && myUrl.slice(-1) === '/')) {
    shortUrl = `http://${myUrl}${id}`
  } else if ((!myUrl.includes('https://') && myUrl.slice(-1) !== '/') || (!myUrl.includes('http://') && myUrl.slice(-1) !== '/')) {
    shortUrl = `http://${myUrl}/${id}`
  }

  const result = (id === 'timeout') ? { status: 'failure', response: 'Timeout! can\'t generate ID, Please try again later.', code: 500 } : await firestore()
    .collection(collectionName)
    .doc(id)
    .set({
      fullUrl: url,
      created: firestore.FieldValue.serverTimestamp(),
    })
    .then(() => ({
      status: 'success',
      id,
      shortUrl,
      fullUrl: url,
      code: 201,
    }))

  return result
}

export const getFullUrl = async (id) => {
  const result = await firestore().collection(collectionName).doc(id).get()
    .then(doc => ((doc.data() === undefined) ? 'notFound' : doc.data().fullUrl))
  return result
}
