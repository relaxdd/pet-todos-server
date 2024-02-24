const fs = require("fs");
const path = require("path");

const rootDir = process.cwd();
// const srcPublicDir = path.resolve(rootDir, "public");
const distPublicDir = path.join(rootDir, "deploy", "public");
const envDevFile = path.join(rootDir, ".env.development");
const envProdFile = path.join(rootDir, "deploy", ".env.production");
const psFile = path.join(rootDir, "deploy", "run.ps1");

if (!fs.existsSync(distPublicDir)) {
  fs.mkdirSync(distPublicDir, { recursive: true });
}

if (fs.existsSync(envDevFile)) {
  fs.copyFile(envDevFile, envProdFile, (err) => {
    if (err) throw err;
  });
}

fs.writeFile(psFile, "node app.js --mode production", function (err) {
  if (err) throw err;
});
