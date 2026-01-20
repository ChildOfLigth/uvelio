import productsDB from '../../database/initDB.js';

export function getAllData() {
    return new Promise((resolve, reject) => {
        productsDB.all('SELECT * FROM products', (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

export function getOneValue(id) {
    return new Promise((resolve, reject) => {
        const sqlCommand = 'SELECT * FROM products WHERE id = ?';

        productsDB.get(sqlCommand, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}
