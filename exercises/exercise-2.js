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

const getGreetings = async (req, res) => {
  const { start, limit } = req.query;
  try {
    await client.connect();
    const db = client.db("exercises");
    const greetings = await db.collection("greetings").find().toArray();
    if (start && limit) {
      limitCalc = parseInt(start) + parseInt(limit);
      res.status(200).send({
        status: 200,
        start: parseInt(start),
        limit: parseInt(limit),
        greetings: greetings.slice(parseInt(start), limitCalc),
      });
    }
    res.status(200).send(greetings.slice(0, 25));
  } catch (e) {
    res.status(404).send(e);
  }
};
module.exports = { createGreeting, getGreeting, getGreetings };
