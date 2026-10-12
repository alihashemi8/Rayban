import { randomBytes, scrypt as derive } from "node:crypto";
import { promisify } from "node:util";
import { writeFile, rename, mkdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const scrypt = promisify(derive);

const args = process.argv.slice(2);
const username = args[0];
const password = args[1];
const dataDir = process.env.RAYBAN_DATA_DIR || resolve(".data");
const adminFile = resolve(dataDir, "admin.json");

if (!username || !password) {
  console.log("Usage: node scripts/create-admin.mjs <username> <password> [--force]");
  console.log("Example: node scripts/create-admin.mjs admin \"StrongSecretPassword123!\"");
  process.exit(1);
}

if (!/^[a-zA-Z0-9_-]{3,50}$/.test(username)) {
  console.error("Error: Username must be 3-50 alphanumeric characters (letters, numbers, _ or -).");
  process.exit(1);
}

if (typeof password !== "string" || password.length < 12 || password.length > 128) {
  console.error("Error: Password must be between 12 and 128 characters long.");
  process.exit(1);
}

let exists = false;
try {
  await readFile(adminFile);
  exists = true;
} catch {
  exists = false;
}

if (exists && !args.includes("--force")) {
  console.error("Error: Admin account already exists in " + adminFile + ". Pass --force to overwrite.");
  process.exit(1);
}

await mkdir(dataDir, { recursive: true });

const salt = randomBytes(32).toString("hex");
const hash = (await scrypt(password, salt, 64)).toString("hex");
const record = { username, salt, hash };

const temporary = adminFile + "." + randomBytes(8).toString("hex") + ".tmp";
await writeFile(temporary, JSON.stringify(record, null, 2), { mode: 0o600 });
await rename(temporary, adminFile);

console.log(`Success: Admin user "${username}" configured successfully in ${adminFile}.`);
