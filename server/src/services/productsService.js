import { productsDB } from "../../database/initDB.js";
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

  const { min, max, inlay, ...filters } = selectedFilters;

  if (min != null && max != null) {
    sqlParts.push(`actualPrice BETWEEN ${min} AND ${max}`);
  }

  if (inlay != null && Array.isArray(inlay) && inlay.length > 0) {
    const inlayCommands = inlay.map((item) => {
      switch (item) {
        case "Not":
          return `inlay LIKE '%Not%'`;

        case "Yes":
          return `inlay IS NOT NULL AND inlay NOT LIKE '%Not%'`;

        default:
          return `inlay LIKE '%${item}%'`;
      }
    });

    sqlParts.push(`(${inlayCommands.join(" OR ")})`);
  }

  for (const [key, values] of Object.entries(filters)) {
    if (!Array.isArray(values) || values.length === 0) continue;

    let command;

    if (STANDART_FILTERS.includes(key)) {
      command = values.map((option) => `${key} LIKE '%${option}%'`);
      sqlParts.push(`(${command.join(" OR ")})`);
    } else {
      command = values.map(
        (option) =>
          `additions LIKE '%"${key}":%' AND additions LIKE '%${option}%'`,
      );
      sqlParts.push(`(${command.join(" OR ")})`);
    }
  }

  return sqlParts.join(" AND ");
}

function getLength(selectedProductsCategory, selectedFilters) {
  return new Promise((resolve, reject) => {
    try {
      let sqlCommand = `
        SELECT COUNT(*) AS length
        FROM products
        WHERE category = ?
      `;

      const params = [selectedProductsCategory];

      if (selectedFilters !== undefined) {
        const filters = normalizeFilters(selectedFilters);
        const filterSQL = searchCommandItemByFilters(filters);

        if (filterSQL) {
          sqlCommand += ` AND ${filterSQL}`;
        }
      }

      productsDB.all(sqlCommand, params, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res[0].length);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

function getProducts(selectedProductsCategory, selectedFilters) {
  return new Promise((resolve, reject) => {
    try {
      let sqlCommand = `
        SELECT *
        FROM products
        WHERE category = ?
      `;

      const params = [selectedProductsCategory];

      if (selectedFilters !== undefined) {
        const filters = normalizeFilters(selectedFilters);
        const filterSQL = searchCommandItemByFilters(filters);

        if (filterSQL) {
          sqlCommand += ` AND ${filterSQL}`;
        }
      }

      sqlCommand += ` LIMIT 10`;

      productsDB.all(sqlCommand, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

function getAdditionalData(
  selectedProductsCategory,
  totalNumOfProds,
  selectedFilters,
) {
  return new Promise((resolve, reject) => {
    let sqlCommand = `
      SELECT *
      FROM products
      WHERE category = ?
    `;

    let sqlCommandForGetLength = `
      SELECT COUNT(*) AS length
      FROM products
      WHERE category = ?
    `;

    const params = [selectedProductsCategory];

    if (selectedFilters !== undefined) {
      const filters = normalizeFilters(selectedFilters);
      const filterSQL = searchCommandItemByFilters(filters);

      if (filterSQL) {
        sqlCommand += ` AND ${filterSQL}`;
        sqlCommandForGetLength += ` AND ${filterSQL}`;
      }
    }

    sqlCommand += ` LIMIT 10 OFFSET ?`;

    productsDB.all(sqlCommand, [...params, totalNumOfProds], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        productsDB.all(sqlCommandForGetLength, params, (err, res) => {
          if (err) {
            reject(err);
          } else {
            const lengthAdditionalData = Number(totalNumOfProds) + rows.length;

            resolve({
              prodsList: rows,
              endOfList: res[0].length === lengthAdditionalData,
            });
          }
        });
      }
    });
  });
}

function gettingProdsForNewPage(
  selectedProductsCategory,
  totalNumOfProds,
  selectedFilters,
) {
  return new Promise((resolve, reject) => {
    let sqlCommand = `
      SELECT *
      FROM products
      WHERE category = ?
    `;

    let sqlCommandForGetLength = `
      SELECT COUNT(*) AS length
      FROM products
      WHERE category = ?
    `;

    if (selectedFilters !== undefined) {
      const filters = normalizeFilters(selectedFilters);
      const filterSQL = searchCommandItemByFilters(filters);

      if (filterSQL) {
        sqlCommand += ` AND ${filterSQL}`;
        sqlCommandForGetLength += ` AND ${filterSQL}`;
      }
    }

    sqlCommand += ` LIMIT 10 OFFSET ?`;

    productsDB.all(
      sqlCommand,
      [selectedProductsCategory, totalNumOfProds],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          productsDB.all(
            sqlCommandForGetLength,
            [selectedProductsCategory],
            (err, res) => {
              if (err) {
                reject(err);
              } else {
                const lengthAdditionalData =
                  Number(totalNumOfProds) + rows.length;

                resolve({
                  prodsList: rows,
                  endOfList: res[0].length === lengthAdditionalData,
                });
              }
            },
          );
        }
      },
    );
  });
}

function searchProdsByName(val, category) {
  return new Promise((resolve, reject) => {
    try {
      const parsedVal = val.split(" ");
      let sqlCommand = `SELECT * FROM products WHERE category = ? AND name LIKE`;
      const createdSqlForVal = parsedVal.map((i) => `'%${i}%'`).join(" AND ");

      sqlCommand += createdSqlForVal;

      productsDB.all(sqlCommand, [category], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    } catch (err) {
      return reject(err);
    }
  });
}

function getRangePrice(selectedProductsCategory) {
  return new Promise((resolve, reject) => {
    productsDB.all(
      "SELECT * FROM products WHERE category = ?",
      [selectedProductsCategory],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const searchMinPrice = [...rows].sort(
            (a, b) => a.actualPrice - b.actualPrice,
          );

          const searchMaxPrice = [...rows].sort(
            (a, b) => b.actualPrice - a.actualPrice,
          );

          resolve({
            min: searchMinPrice[0].actualPrice,
            max: searchMaxPrice[0].actualPrice,
          });
        }
      },
    );
  });
}

function getReviewForProduct(prodId) {
  return new Promise((resolve, reject) => {
    productsDB.all(
      "SELECT * FROM product_reviews WHERE product_id = ?",
      [prodId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      },
    );
  });
}

function getProductsById(idsList) {
  return new Promise((resolve, reject) => {
    if (idsList?.length === 0) {
      return resolve([]);
    }

    const placeholders = idsList?.map(() => "?").join(", ");

    const query = `
      SELECT *
      FROM products
      WHERE id IN (${placeholders})
    `;

    productsDB.all(query, idsList, (err, rows) => {
      if (err) {
        return reject(err);
      }

      const prodsByWishList = rows.map((i) => ({
        id: i.id,
        name: i.name,
        imgsLinks: i.imgsLinks,
        actualPrice: i.actualPrice,
        priceWithoutDisc: i.price_without_discount,
        in_stock: i.in_stock,
      }));

      resolve(JSON.stringify(prodsByWishList));
    });
  });
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
