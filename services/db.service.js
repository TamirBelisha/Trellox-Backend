const MongoClient = require('mongodb').MongoClient

const config = require('../config')

module.exports = {
  getCollection,
}

const dbName = 'board_db'

var dbConn = null

console.log('config', config)

async function getCollection(collectionName) {
  try {
    console.log('IN GET COLLECTION', config, collectionName)
    const db = await connect()
    console.log('db', db)

    const collection = await db.collection(collectionName)
    console.log('collection', collection)
    return collection
  } catch (err) {
    logger.error('Failed to get Mongo collection', err)
    throw err
  }
}

async function connect() {
  if (dbConn) return dbConn
  try {
    const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = client.db(dbName)
    dbConn = db
    return db
  } catch (err) {
    logger.error('Cannot Connect to DB', err)
    throw err
  }
}
