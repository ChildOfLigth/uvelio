import { userAccountsDB } from "../../database/initDB.js";

export const getOneUser = async (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM userAccounts WHERE id = ?";

    userAccountsDB.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(row);
    });
};

export const addUser = async (req, res) => {
    const { username, email, password } = req.body;

    const sql = `
        INSERT INTO userAccounts (username, email, password)
        VALUES (?, ?, ?)
    `;

    userAccountsDB.run(sql, [username, email, password], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            id: this.lastID,
            username,
            email
        });
    });
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM userAccounts WHERE id = ?";

    userAccountsDB.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ deleted: false });
        }

        res.json({ deleted: true });
    });
};
