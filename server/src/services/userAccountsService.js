import { userAccountsDB } from "../../database/initDB";

function getOneUser(id) {
    return Promise((resolve, reject) => {
        const sqlComand = "SELECT * FROM userAccounts WHERE id = ?";
        userAccountsDB.get(sqlComand, [id]), (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        }
    })
};

function addUser({ id, username, email, password }) {
    return new Promise((resolve, reject) => {
        const sql = `
      INSERT INTO userAccounts (username, email, password)
      VALUES (?, ?, ?)
    `;

        userAccountsDB.run(sql, [id, username, email, password], (err) => {
            if (err) reject(err);
            else resolve({ id, username, email, password });
        });
    });
};

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM userAccounts WHERE id = ?`;

        userAccountsDB.run(sql, [id], (err) => {
            if (err) {
                reject(err);
            } else {
                if (this.changes === 0) {
                    resolve({ deleted: false });
                } else {
                    resolve({ deleted: true });
                }
            }
        })
    });
};

export { addUser, getOneUser, deleteUser }