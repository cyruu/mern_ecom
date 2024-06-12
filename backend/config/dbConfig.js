import mongoose from "mongoose";

const connect = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(`Connected mongodb ${conn.connection.host}`);
  } catch (err) {
    console.log("mongodb connection error", err);
  }
};

export default connect;
