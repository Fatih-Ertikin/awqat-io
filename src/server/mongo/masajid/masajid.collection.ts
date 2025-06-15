import { ObjectId } from "mongodb";
import mongoClient from "../mongo-client";
import { Masjid } from "./types/masjid.document";

export function getAllMasajid(): Promise<Masjid[]> {
  const db = mongoClient.db("awqat-io");

  const masajidCollection = db.collection<Masjid>("masajid");

  return masajidCollection.find().toArray();
}

export async function createMasjid(masjid: Masjid): Promise<ObjectId> {
  const db = mongoClient.db("awqat-io");

  const masajidCollection = db.collection<Masjid>("masajid");

  const result = await masajidCollection.insertOne(masjid);

  return result.insertedId;
}

export async function deleteMasjid(id: ObjectId): Promise<void> {
  const db = mongoClient.db("awqat-io");

  const masajidCollection = db.collection<Masjid>("masajid");

  await masajidCollection.deleteOne({ _id: id });
}

export async function updateMasjid(masjid: Masjid): Promise<void> {
  const db = mongoClient.db("awqat-io");

  const masajidCollection = db.collection<Masjid>("masajid");

  console.log("Updating masjid with ID:", masjid._id);

  await masajidCollection.updateOne(
    { _id: new ObjectId(masjid._id) },
    { $set: masjid }
  );
}
