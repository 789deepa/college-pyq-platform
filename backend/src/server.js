import app from "./app.js";
import healthRouter from "./routes/health.js";

const PORT = 5000;

app.use("/health", healthRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `);
});