import express from "express";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5003;

app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
app.use("/profile", profileRoutes);

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});
