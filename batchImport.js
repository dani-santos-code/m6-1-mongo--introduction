const fs = require("file-system");
const { MongoClient } = require("mongodb");

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const client = new MongoClient("mongodb://localhost:27017", {
  useUnifiedTopology: true,
});

const batchImport = async () => {
  try {
    await client.connect();
    const db = client.db("exercises");
    await db.collection("greetings").insertMany(greetings);
    assert.equal(Object.keys(greetings).length, r.insertedCount);
  } catch (e) {
    console.log(e.stack);
  }
};

batchImport();
