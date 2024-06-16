const { MongoClient, ObjectId } = require('mongodb')
const _ = require('lodash')
const connStr = process.env.MONGO_DB_CONN
const dbName = process.env.MONGO_DB_NAME
const env = process.env.NODE_ENV

const AsyncLock = require('async-lock');
const lock = new AsyncLock();
console.log('conn str: ', connStr)
let client = null

let db = null
const postfix = env === 'testing' ? '_it' : ''
const raidsCollectionName = `raids${postfix}`
const activitiesCollectionName = `activities_new${postfix}`
const emoteConfigsCollectionName = `emotes${postfix}`
let connecting = false

const getDB = async () => {
    return lock.acquire('db', async () => {
        // if (!db || !client.isConnected()) {
        if (!db) {
            if (connecting) {
                setTimeout()
            }
            console.log('connecting')
            client = new MongoClient(connStr, { useNewUrlParser: true, useUnifiedTopology: true })
            await client.connect()
            console.log('connected')
            db = client.db(dbName)
        }
        return db
    })
}

const getRaidsCollection = async () => {
    const db = await getDB()
    return db.collection(raidsCollectionName)
}

const getActivitiesCollection = async () => {
    const db = await getDB()
    return db.collection(activitiesCollectionName)
}

const getEmoteConfigsCollection = async () => {
    const db = await getDB()
    return db.collection(emoteConfigsCollectionName)
}

const getObjectID = (id) => {
    return new ObjectId(id)
}

const formatOutput = (obj) => {
    if (!obj) return obj
    return _.extend(_.omit(obj, '_id'), { id: obj._id.toString() })
}
module.exports = { getDB, getActivitiesCollection, getRaidsCollection, getEmoteConfigsCollection, client, getObjectID, formatOutput }