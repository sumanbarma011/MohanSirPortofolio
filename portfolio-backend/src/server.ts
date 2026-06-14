import { createApp } from "./app";
import { connectDatabase } from "./config/db";
import { ENV } from "./config/global.config";
import { seedAdmin } from "./config/seed";

const PORT = Number(ENV.PORT) || 3000;
const server = async (): Promise<void> => {
  try {
    await connectDatabase();
    await seedAdmin();
    const app = createApp();

    app.listen(PORT, () => {
      console.log(`Server started on port: http://localhost:${PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
};

server().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

// Global error handlers to prevent server crashes
process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  console.error(" Unhandled Rejection at:", promise, "reason:", reason);
  console.error("Stack:", reason?.stack || "No stack available");
  // Don't exit the process for unhandled rejections, just log them
});

process.on("uncaughtException", (error: Error) => {
  console.error(" Uncaught Exception:", error);
  console.error("Stack:", error.stack);
  // Exit the process for uncaught exceptions as they're more serious
  process.exit(1);
});
