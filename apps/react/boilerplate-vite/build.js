const { execSync } = require("node:child_process");

try {
  // 1. Build the client-side code (e.g., React app)
  execSync("npm run build:client", { stdio: "inherit" });

  // 2. Build the server-side code
  execSync("npm run build:server", { stdio: "inherit" });

  console.log("Build successful!");
} catch (error) {
  console.error("Build failed:", error);
  process.exit(1); // Exit with an error code
}