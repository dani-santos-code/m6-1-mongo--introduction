const assert = require("assert");
const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017", {
  useUnifiedTopology: true,
});
const createGreeting = async (req, res) => {
  // temporary content... for testing purposes.
  try {
    await client.connect();
    const db = client.db("exercises");
    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const getGreeting = async (req, res) => {
  const { _id } = req.params;
  try {
    await client.connect();
    const db = client.db("exercises");
    db.collection("greetings").findOne({ _id }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, _id, data: result })
        : res.status(404).json({ status: 404, _id, data: "Not Found" });
      client.close();
    });
  } catch (e) {
    res.status(404).send(e);
  }
};
module.exports = { createGreeting, getGreeting };
