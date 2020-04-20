const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017", {
  useUnifiedTopology: true,
});
const dbFunction = async (dbName) => {
  await client.connect();
  console.log("connected!");
  const db = client.db(dbName);
  await db.collection("one").insertOne({ name: "Test Two" });
};

const getCollection = async (req, res) => {
  const { dbName, collection } = req.params;
  dbFunction(dbName);
  client
    .db(dbName)
    .collection(collection)
    .find()
    .toArray((err, data) => {
      if (err) {
        res.status(401).send({ err });
      } else {
        res.status(200).json({ status: 200, connection: "successful!", data });
        client.close();
      }
    });
};

module.exports = { getCollection };
