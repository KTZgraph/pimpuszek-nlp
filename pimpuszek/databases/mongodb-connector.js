/*
npm i mongoose
*/

import mongoose from "mongoose";
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

export const connectMongodb = async () => {
  const MONGODB_STRING = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.imdqbw0.mongodb.net/?retryWrites=true&w=majority`;

  await mongoose.connect(MONGODB_STRING);
  console.log("Mongodb connected");
};
