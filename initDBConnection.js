import mongoose from "mongoose";

export const initDBConnection = async (DB_HOST) => {
  try {
    mongoose.connect(DB_HOST);
    console.log("Database connection successful");
  } catch (error) {
    console.log(e.message);
    process.exit(1);
  }
};

export const closeDBConnection = async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log(error.message);
  }
};
