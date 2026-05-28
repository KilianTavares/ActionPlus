import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5003;
// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
// Get the directory name from the file path
const __dirname = dirname(__filename);
// Routes
app.use("/user", authRoutes);
app.use("/contact", contactRoutes);
app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map