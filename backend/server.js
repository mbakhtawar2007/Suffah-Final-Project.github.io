// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

/* -------------------------------------------
   1️⃣ MONGO CONNECTION
-------------------------------------------- */
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.warn("⚠️ Warning: MONGO_URI is missing in .env file.");
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("🔴 MongoDB Error:", err.message));
}

/* -------------------------------------------
   2️⃣ CORS CONFIG
-------------------------------------------- */
app.use(
  cors({
    origin: [
         "http://localhost:5173",
         "http://localhost:5174",
      "http://localhost:3000",
      "http://localhost:5000",
      "https://shopease-adminpanel.netlify.app",
      "https://shopease-client-side.netlify.app",
      "https://suffah-final-project-github-io.vercel.app",
    ],
    credentials: true,
  })
);

/* -------------------------------------------
   3️⃣ MIDDLEWARE
-------------------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------------------------------
   4️⃣ STATIC FILES
-------------------------------------------- */
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(express.static(path.join(__dirname, "public")));

/* -------------------------------------------
   5️⃣ API ROUTES
-------------------------------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

/* -------------------------------------------
   6️⃣ TEST ROUTES
-------------------------------------------- */
app.get("/", (req, res) => res.send("✅ API is running successfully"));
app.get("/api/test", (req, res) => res.json({ success: true }));

/* -------------------------------------------
   7️⃣ GLOBAL ERROR HANDLER
-------------------------------------------- */
app.use((err, req, res, next) => {
  console.error("🔥 Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

/* -------------------------------------------
   8️⃣ EXPORT FOR VERCEL
-------------------------------------------- */
module.exports = app;

/* -------------------------------------------
   9️⃣ LOCAL DEV SERVER
-------------------------------------------- */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
