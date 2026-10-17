import { pool } from "../../database/initDB.js";
import { STANDART_FILTERS } from "../config.js";

function normalizeFilters(selectedFilters) {
  if (!selectedFilters) return;

  if (typeof selectedFilters === "object") {
    return selectedFilters;
  }

  return JSON.parse(selectedFilters);
}

function searchCommandItemByFilters(selectedFilters) {
  const sqlParts = [];
  const params = [];

  const { min, max, inlay, ...filters } = selectedFilters;

  if (min != null && max != null) {
    sqlParts.push(
      `actualPrice BETWEEN $${params.length + 1} AND $${params.length + 2}`,
    );
    params.push(min, max);
  }

  if (inlay != null && Array.isArray(inlay) && inlay.length > 0) {
    const inlayCommands = inlay.map((item) => {
      if (item === "Not") {
        return `inlay LIKE '%Not%'`;
      }
      if (item === "Yes") {
        return `inlay IS NOT NULL AND inlay NOT LIKE '%Not%'`;
      }
      params.push(`%${item}%`);
      return `inlay LIKE $${params.length}`;
    });

    sqlParts.push(`(${inlayCommands.join(" OR ")})`);
  }

  for (const [key, values] of Object.entries(filters)) {
    if (!Array.isArray(values) || values.length === 0) continue;

    if (STANDART_FILTERS.includes(key)) {
      const commands = values.map((option) => {
        params.push(`%${option}%`);
        return `${key} LIKE $${params.length}`;
      });
      sqlParts.push(`(${commands.join(" OR ")})`);
    } else {
      const commands = values.map((option) => {
        params.push(`%"${key}":%`);
        params.push(`%${option}%`);
        return `additions LIKE $${params.length - 1} AND additions LIKE $${params.length}`;
      });
      sqlParts.push(`(${commands.join(" OR ")})`);
    }
  }

  return {
    sql: sqlParts.join(" AND "),
    params,
  };
}

async function getLength(selectedProductsCategory, selectedFilters) {
  try {
    let sqlCommand = `
      SELECT COUNT(*) AS length
      FROM products
      WHERE category = $1
    `;
    const params = [selectedProductsCategory];

    if (selectedFilters !== undefined) {
      const filters = normalizeFilters(selectedFilters);
      const { sql, params: filterParams } = searchCommandItemByFilters(filters);

      if (sql) {
        // сдвигаем номера параметров
        let shiftedSql = sql;
        filterParams.forEach((_, index) => {
          shiftedSql = shiftedSql.replace(
            `$${index + 1}`,
            `$${params.length + index + 1}`,
          );
        });
        sqlCommand += ` AND ${shiftedSql}`;
        params.push(...filterParams);
      }
    }

    const result = await pool.query(sqlCommand, params);
    return result.rows[0].length;
  } catch (err) {
    throw err;
  }
}

async function getProducts(selectedProductsCategory, selectedFilters) {
  try {
    let sqlCommand = `
      SELECT *
      FROM products
      WHERE category = $1
    `;
    const params = [selectedProductsCategory];

    if (selectedFilters !== undefined) {
      const filters = normalizeFilters(selectedFilters);
      const { sql, params: filterParams } = searchCommandItemByFilters(filters);

      if (sql) {
        let shiftedSql = sql;
        filterParams.forEach((_, index) => {
          shiftedSql = shiftedSql.replace(
            `$${index + 1}`,
            `$${params.length + index + 1}`,
          );
        });
        sqlCommand += ` AND ${shiftedSql}`;
        params.push(...filterParams);
      }
    }

    sqlCommand += ` LIMIT 10`;

    const result = await pool.query(sqlCommand, params);
    return result.rows;
  } catch (err) {
    throw err;
  }
}

async function getAdditionalData(
  selectedProductsCategory,
  totalNumOfProds,
  selectedFilters,
) {
  try {
    let sqlCommand = `
      SELECT *
      FROM products
      WHERE category = $1
    `;
    let sqlCommandForGetLength = `
      SELECT COUNT(*) AS length
      FROM products
      WHERE category = $1
    `;
    const params = [selectedProductsCategory];
    const lengthParams = [selectedProductsCategory];

    if (selectedFilters !== undefined) {
      const filters = normalizeFilters(selectedFilters);
      const { sql, params: filterParams } = searchCommandItemByFilters(filters);

      if (sql) {
        let shiftedSql = sql;
        filterParams.forEach((_, index) => {
          shiftedSql = shiftedSql.replace(
            `$${index + 1}`,
            `$${params.length + index + 1}`,
          );
        });
        sqlCommand += ` AND ${shiftedSql}`;
        sqlCommandForGetLength += ` AND ${shiftedSql}`;
        params.push(...filterParams);
        lengthParams.push(...filterParams);
      }
    }

    sqlCommand += ` LIMIT 10 OFFSET $${params.length + 1}`;
    params.push(totalNumOfProds);

    const rowsResult = await pool.query(sqlCommand, params);
    const lengthResult = await pool.query(sqlCommandForGetLength, lengthParams);

    const lengthAdditionalData =
      Number(totalNumOfProds) + rowsResult.rows.length;

    return {
      prodsList: rowsResult.rows,
      endOfList: lengthResult.rows[0].length === lengthAdditionalData,
    };
  } catch (err) {
    throw err;
  }
}

async function gettingProdsForNewPage(
  selectedProductsCategory,
  totalNumOfProds,
  selectedFilters,
) {
  return getAdditionalData(
    selectedProductsCategory,
    totalNumOfProds,
    selectedFilters,
  );
}

async function searchProdsByName(val, category) {
  try {
    const parsedVal = val.split(" ");
    let sqlCommand = `SELECT * FROM products WHERE category = $1`;
    const params = [category];

    parsedVal.forEach((word) => {
      params.push(`%${word}%`);
      sqlCommand += ` AND name LIKE $${params.length}`;
    });

    const result = await pool.query(sqlCommand, params);
    return result.rows;
  } catch (err) {
    throw err;
  }
}

async function getRangePrice(selectedProductsCategory) {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE category = $1",
      [selectedProductsCategory],
    );

    const rows = result.rows;

    if (rows.length === 0) {
      return { min: 0, max: 0 };
    }

    const searchMinPrice = [...rows].sort(
      (a, b) => a.actualPrice - b.actualPrice,
    );
    const searchMaxPrice = [...rows].sort(
      (a, b) => b.actualPrice - a.actualPrice,
    );

    return {
      min: searchMinPrice[0].actualPrice,
      max: searchMaxPrice[0].actualPrice,
    };
  } catch (err) {
    throw err;
  }
}

async function getReviewForProduct(prodId) {
  try {
    const result = await pool.query(
      "SELECT * FROM product_reviews WHERE product_id = $1",
      [prodId],
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
}

async function getProductsById(idsList) {
  try {
    if (!idsList || idsList.length === 0) {
      return JSON.stringify([]);
    }

    const placeholders = idsList.map((_, i) => `$${i + 1}`).join(", ");

    const query = `
      SELECT *
      FROM products
      WHERE id IN (${placeholders})
    `;

    const result = await pool.query(query, idsList);

    const prodsByWishList = result.rows.map((i) => ({
      id: i.id,
      name: i.name,
      imgsLinks: i.imgsLinks,
      actualPrice: i.actualPrice,
      priceWithoutDisc: i.price_without_discount,
      in_stock: i.in_stock,
    }));

    return JSON.stringify(prodsByWishList);
  } catch (err) {
    throw err;
  }
}

export {
  getLength,
  getProducts,
  getAdditionalData,
  searchProdsByName,
  gettingProdsForNewPage,
  getRangePrice,
  getReviewForProduct,
  getProductsById,
};