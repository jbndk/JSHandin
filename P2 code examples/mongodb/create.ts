import { MongoClient, Db, Collection } from "mongodb"
import connect from "./connect";
import setupTestData from "./setupTestData"

(async function Tester() {
  const client = await connect();
  const db = client.db("day1ex1")
  const collection = db.collection("inventory")
  const status = await setupTestData(collection)
  
try {

  await collection.insertOne(
    { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
 )

  await collection.insertMany(
    [
      { item: "pencil", qty: 50},
      { item: "A3 paper", qty: 20000}
    ]
  )

} catch (e) {
  console.log(e)
}
 
  //# Find all:
  //const all = await collection.find({}).toArray()
  //console.log(all)

  //# Find one:
  const pencil = await collection.find({item: "pencil"}).toArray()
  console.log(pencil)

    //# Find one via Projection:
    const pencilProjection = await collection.find({item: "pencil"}).project({item:1}).toArray()
    console.log(pencilProjection)

  client.close()
})()
