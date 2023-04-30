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
    console.log('Failed to get Mongo collection', err)
    throw err
  }
}

async function connect() {
  console.log('dbConn', dbConn)
  if (dbConn) return dbConn
  try {
    console.log('BEFORE')
    const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('AFTER', client)
    const db = client.db(dbName)
    console.log('db', db)
    dbConn = db
    return db
  } catch (err) {
    logger.error('Cannot Connect to DB', err)
    console.log('Cannot Connect to DB', err)
    throw err
  }
}
