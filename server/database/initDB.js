import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Database } = sqlite3;

const throwError = (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("Database successfully open");
  }
};

const productsDbPath = path.join(__dirname, "products.db");
const userAccountDbPath = path.join(__dirname, "userAccounts.db");

const productsDB = new Database(productsDbPath, (err) => throwError(err));
const userAccountDB = new Database(userAccountDbPath, (err) => throwError(err));

function initDB() {
  productsDB.serialize(() => {
    productsDB.run(`
    CREATE TABLE IF NOT EXISTS products (
      id              TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(4)))),
      category        TEXT NOT NULL,
      imgsLinks       TEXT NOT NULL,
      name            TEXT NOT NULL,
      actualPrice     NUMERIC NOT NULL,
      sale            INTEGER DEFAULT 0,
      price_without_discount NUMERIC,
      avg_rating      NUMERIC DEFAULT 0,
      reviews_count   INTEGER DEFAULT 0,
      weight          NUMERIC,
      style           TEXT NOT NULL,
      type            TEXT,
      material        TEXT NOT NULL,
      color_material  TEXT,
      hallmark        INTEGER NOT NULL,
      for_whom        TEXT NOT NULL,
      num_of_stones   TEXT,
      inlay           TEXT,
      description     TEXT,
      exclusive       INTEGER DEFAULT 0,
      in_stock        INTEGER DEFAULT 1,
      who_to_gift     TEXT NOT NULL,
      additions       TEXT
    )
  `);

    productsDB.run(`
    CREATE TABLE IF NOT EXISTS product_reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL,
      author_name TEXT NOT NULL,
      rating INTEGER,
      text TEXT NOT NULL,
      likes_count INTEGER DEFAULT 0,
      created_at TEXT,
      response_from_manager INTEGER DEFAULT 1,
      manager_response_text TEXT,
      manager_response_likes INTEGER DEFAULT 0,
      manager_response_date TEXT
    )
  `);

    function updateProductsStats() {
      productsDB.run(
        `
      UPDATE products
      SET 
        avg_rating = (
          SELECT COALESCE(AVG(rating), 0)
          FROM product_reviews
          WHERE product_reviews.product_id = products.id
        ),
        reviews_count = (
          SELECT COUNT(*)
          FROM product_reviews
          WHERE product_reviews.product_id = products.id
        )
    `,
        (err) => {
          if (err) {
            console.error("Error updating products:", err);
            return;
          }
        },
      );
    }
    updateProductsStats();
  });

  userAccountDB.run(`
    CREATE TABLE IF NOT EXISTS userAccounts(
      id TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      email TEXT,
      password TEXT NOT NULL,
      wish_list TEXT,
      purchased_goods TEXT,
      refresh_token TEXT UNIQUE
    )
  `);
}

export default initDB;
export { productsDB, userAccountDB };
