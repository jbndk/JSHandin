import { MongoClient, Db, Collection } from "mongodb"
import connect from "./connect";
import setupTestData from "./setupTestData"

(async function Tester() {
  const client = await connect();
  const db = client.db("day1ex1")
  const collection = db.collection("inventory")
  const status = await setupTestData(collection)
  
  const allBefore = await collection.find({}).toArray()
  console.log(allBefore)

  await collection.updateOne(
    {
      item: "sketch pad"},
      {
        $set: {qty: 100, "priority": "high"},
        $currentDate: {lastModified: true}
      }
  )
  
  await collection.updateMany(
    { qty: { $lt: 85 } },
    {
      $set: { qty: 90 },
      $currentDate: { lastModified: true }
    }
 )

  await collection.replaceOne(
    { item: "paper" },
    { item: "A3 paper", qty: 50 }
)

  const allAfter = await collection.find({}).toArray()
  console.log(allAfter)


  client.close()
})()
