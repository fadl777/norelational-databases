const { MongoClient } = require("mongodb");

const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

// You will understand this boilerplate in session 6.
// For now, your job is to fill in the seven TODOs below.

async function main() {
  await client.connect();
  const users = client.db("blog_db").collection("users");

  await users.deleteMany({});

  // TODO 1: insert a user with an embedded address object.
  // The address must have at least a city and a country field.
  await users.insertOne({
    name: "Fadl",
    address:
      {
        city: "Beirut",
        country: "Lebanon"
      }
  });

  // TODO 2: insert a user with a skills array containing at least 3 items.
  await users.insertOne({
    name: "Martin",
    skills: ["Goated", "Datamobase", "G"]
  });
  // TODO 3: use insertMany to insert at least 5 users in a single call.
  // Requirements:
  //   - At least 2 users must have address.country set to "France"
  //   - At least 2 users must have a skills array with at least 1 item
  await users.insertMany([
  {
    name: "Alice",
    address: {
      city: "Paris",
      country: "France"
    },
    skills: ["Python", "SQL"]
  },
  {
    name: "John",
    address: {
      city: "Lyon",
      country: "France"
    }
  },
  {
    name: "Sarah",
    skills: ["JavaScript", "React"]
  },
  {
    name: "David",
    address: {
      city: "Beirut",
      country: "Lebanon"
    },
    skills: ["MongoDB"]
  },
  {
    name: "Emma",
    address: {
      city: "London",
      country: "United Kingdom"
    }
  }
]);


  // TODO 4: retrieve all documents and log each user's name.

  await users.find({})

  // TODO 5: use dot notation to find the user whose address.city is "Paris" and log the result.
  await users.find({"address.city" : "Paris"})

  // TODO 6: find all users whose address.country is "France" and log their names.
  await users.find({"address.country" : "France"})

  // TODO 7: find all users who have a skills field and log their names.
  await users.find({skills:{ $exists: true }})

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
