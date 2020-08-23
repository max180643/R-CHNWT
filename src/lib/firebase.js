require('dotenv').config()

require('firebase/firestore')

const firebase = require('firebase/app')

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  appId: process.env.FIREBASE_APP_ID,
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
}

firebase.initializeApp(config)
