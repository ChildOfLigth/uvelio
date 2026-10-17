import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "./database/initDB.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runSqlFile(filePath) {
  const sql = fs.readFileSync(filePath, "utf8");

  const inserts = sql
    .split("\n")
    .filter((line) => line.trim().toUpperCase().startsWith("INSERT INTO"))
    .join("\n");

  if (!inserts.trim()) {
    console.log(`Нет INSERT-ов в файле: ${filePath}`);
    return;
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(inserts);
    await client.query("COMMIT");
    console.log(`Успешно загружен: ${path.basename(filePath)}`);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(`Ошибка при загрузке ${filePath}:`, err.message);
  } finally {
    client.release();
  }
}

async function main() {
  try {
    const productsDump = path.join(__dirname, "database", "products_dump.sql");
    const usersDump = path.join(__dirname, "database", "users_dump.sql");

    console.log("Начинаю загрузку данных...");

    await runSqlFile(productsDump);
    await runSqlFile(usersDump);

    console.log("Готово!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
