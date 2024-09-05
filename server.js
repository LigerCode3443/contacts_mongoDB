import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";

dotenv.config();

const { PORT } = process.env;
const port = Number(PORT);

const startServer = () => {
  const app = express();

  app.use(morgan("tiny"));
  app.use(cors());
  app.use(express.json());
  app.use(express.static("public"));

  app.use("/api/contacts", contactsRouter);
  app.use("/api/auth", authRouter);

  app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
  });

  return app.listen(port, () => {
    console.log(`Server is running. Use our API on port: ${port}`);
  });
};

export default startServer;
