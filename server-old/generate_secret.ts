console.log(require("crypto").randomBytes(64).toString("hex"));
// Run this file to generate a new secret for signing cookies.
// Use the output to set the JWT_SECRET environment variable.