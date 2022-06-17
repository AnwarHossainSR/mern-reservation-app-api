import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
//import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    console.log("mongose connected...");

    //express server
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log("error");
    throw error;
  }
};

// app.listen(4000, () => {
//   console.log("Connected to backend.");
// });
connect();
