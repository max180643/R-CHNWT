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

const customPathValid = (customPath) => {
  const pattern = new RegExp('([^a-zA-Z0-9_-])')
  return !pattern.test(customPath)
}

const genID = async () => {
  if (countLimit > maxLimit) return 'timeout'
  countLimit += 1
  const id = nanoid(5)
  const isExist = await firestore().collection(collectionName).doc(id).get()
    .then(doc => (!doc.exists ? id : genID()))
  return isExist
}

const customPathExist = async (customPath) => {
  const isExist = await firestore().collection(collectionName).doc(customPath).get()
    .then(doc => (!!doc.exists))
  return isExist
}

export const genShortUrl = async (request) => {
  const { url, customPath } = request

  const myUrl = process.env.MY_URL

  let shortUrl

  const fixShortUrl = (id) => {
    if ((myUrl.includes('https://') && myUrl.slice(-1) === '/') || (myUrl.includes('http://') && myUrl.slice(-1) === '/')) {
      shortUrl = `${myUrl}${id}`
    } else if ((myUrl.includes('https://') && myUrl.slice(-1) !== '/') || (myUrl.includes('http://') && myUrl.slice(-1) !== '/')) {
      shortUrl = `${myUrl}/${id}`
    } else if ((!myUrl.includes('https://') && myUrl.slice(-1) === '/') || (!myUrl.includes('http://') && myUrl.slice(-1) === '/')) {
      shortUrl = `http://${myUrl}${id}`
    } else if ((!myUrl.includes('https://') && myUrl.slice(-1) !== '/') || (!myUrl.includes('http://') && myUrl.slice(-1) !== '/')) {
      shortUrl = `http://${myUrl}/${id}`
    }
  }

  if (url && !urlValid(url)) return { status: 'failure', response: 'URL pattern is invalid.', code: 400 }

  if (customPath) {
    if (!customPathValid(customPath)) return { status: 'failure', response: 'Custom path pattern is invalid.', code: 400 }

    const result = await customPathExist(customPath) ? { status: 'failure', response: 'Custom path is already exists.', code: 400 } : await firestore()
      .collection(collectionName)
      .doc(customPath)
      .set({
        fullUrl: url,
        created: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        fixShortUrl(customPath)
        return ({
          status: 'success',
          id: customPath,
          shortUrl,
          fullUrl: url,
          code: 201,
        })
      })

    return result
  }

  countLimit = 0

  const id = await genID()

  const result = (id === 'timeout') ? { status: 'failure', response: 'Timeout! can\'t generate ID, Please try again later.', code: 500 } : await firestore()
    .collection(collectionName)
    .doc(id)
    .set({
      fullUrl: url,
      created: firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      fixShortUrl(id)
      return ({
        status: 'success',
        id,
        shortUrl,
        fullUrl: url,
        code: 201,
      })
    })

  return result
}

export const getFullUrl = async (id) => {
  const result = await firestore().collection(collectionName).doc(id).get()
    .then(doc => ((doc.data() === undefined) ? 'notFound' : doc.data().fullUrl))
  return result
}
