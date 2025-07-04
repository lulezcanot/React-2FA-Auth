import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js"
import authRoutes from "./routes/authRoutes.js"
import "./config/passportConfig.js"

dotenv.config();
dbConnect();

const app = express();

// Middlewares
const corsOptions = {
  origin: ["http://localhost:3001"],
  credentials: true 
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session())

// ROUTES
app.use("/api/auth", authRoutes)

// Listen app
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
