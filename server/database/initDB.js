import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Database } = sqlite3;

const throwError = (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log('Database successfully open');
  }
};
const productsDbPath = path.join(__dirname, 'products.db');
const userAccountsDbPath = path.join(__dirname, 'userAccounts.db');

const productsDB = new Database(productsDbPath, (err) => throwError(err));
const userAccountsDB = new Database(userAccountsDbPath, (err) => throwError(err));

function initDB() {
  productsDB.serialize(() => {
    productsDB.run(`
      CREATE TABLE IF NOT EXISTS products(
        id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
        name TEXT NOT NULL,
        price NUMERIC NOT NULL,
        weight NUMERIC,
        assessment NUMERIC NOT NULL,
        style TEXT NOT NULL,
        material TEXT NOT NULL,
        hallmark TEXT NOT NULL,
        forWhom TEXT NOT NULL,
        category TEXT NOT NULL,
        num_of_stones INTEGER,
        inlay TEXT NOT NULL,
        description TEXT,
        type TEXT NOT NULL
      )
    `);

    productsDB.run(`
      CREATE TABLE IF NOT EXISTS productImgs(
        id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
        product_id TEXT NOT NULL,
        url TEXT NOT NULL,
        FOREIGN KEY(product_id) REFERENCES products(id)
      )
    `);
  });

  userAccountsDB.run(`
    CREATE TABLE IF NOT EXISTS userAccounts(
      id TEXT NOT NULL UNIQUE,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `);
}

export default initDB;
export { productsDB, userAccountsDB };