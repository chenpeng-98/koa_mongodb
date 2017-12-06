// connect to mongodb
const MongoClient = require('mongodb').MongoClient;

function connect(url) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, async (err, db) => {
      if (err) {
        console.error('connect to server faild', err);
        reject(null);
      }
      resolve(db);
    });
  });
}

// insert a document
function insert(db, collectionName, insertContent, insertCallback) {
  const collection = db.collection(collectionName);
  collection.insert(insertContent, insertCallback)
}

// find a docment
function find(db, collectionName, findFeture) {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName);
    collection.find(findFeture).toArray((err, docs) => {
      if (err) {
        reject(null);
      }
      resolve(docs);
    });
  });
}

// updateOne a docment
function updateOne(db, collectionName, findFeture, addInfo) {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName);
    collection.updateOne(findFeture, {
      $set: addInfo
    }, (err, result) => {
      if (err) {
        reject(null);
      }
      resolve(result);
    })
  });
}

module.exports = {
  connect,
  insert,
  find,
  updateOne
}