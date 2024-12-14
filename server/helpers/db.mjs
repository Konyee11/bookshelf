import mongoose from "mongoose";

mongoose.set("strictQuery", true);

import env from "dotenv";
env.config();

// MongoDBに接続
mongoose.connect(process.env.MONGO_URI, { tls: true });
