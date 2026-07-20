import mongoose from "mongoose";

let connection = null;

export function hasMongoConfig() {
  return Boolean(process.env.MONGODB_URI);
}

export async function connectMongo() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }
  if (!connection) {
    connection = mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB || "aayat_integrated_solutions",
    });
  }
  return connection;
}
