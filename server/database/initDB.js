import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function initDB() {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id              TEXT PRIMARY KEY,
        category        TEXT NOT NULL,
        imgsLinks       TEXT NOT NULL,
        name            TEXT NOT NULL,
        actualPrice     NUMERIC NOT NULL,
        sale            INTEGER DEFAULT 0,
        price_without_discount NUMERIC,
        avg_rating      NUMERIC DEFAULT 0,
        reviews_count   INTEGER DEFAULT 0,
        weight          NUMERIC,
        style           TEXT,
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

    await client.query(`
      CREATE TABLE IF NOT EXISTS product_reviews (
        id SERIAL PRIMARY KEY,
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

    await client.query(`
      CREATE TABLE IF NOT EXISTS userAccounts (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        surname TEXT NOT NULL,
        email TEXT,
        password TEXT NOT NULL,
        wish_list TEXT,
        purchased_goods TEXT,
        refresh_token TEXT UNIQUE
      )
    `);

    await client.query(`
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
    `);

    console.log("Database successfully initialized");
  } catch (err) {
    console.error("Error initializing database:", err);
    process.exit(1);
  } finally {
    client.release();
  }
}

export default initDB;
export { pool };