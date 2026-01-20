import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from 'uuid';
import { userAccountsDB } from "../../database/initDB.js";

const SALT_ROUNDS = 10;

const generateJwtToken = (id) => {
    const token = jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );

    return token;
};

async function userRegistration({ username, email, password }) {
    const usId = uuid();

    const hashedCode = await bcrypt.hash(password, SALT_ROUNDS);

    return new Promise((resolve, reject) => {
        const sql = `
      INSERT INTO userAccounts (id, username, email, password)
      VALUES (?, ?, ?, ?)
    `;

        userAccountsDB.run(sql, [usId, username, email, hashedCode], (err) => {
            if (err) reject(err);

            const jwtToken = generateJwtToken(usId);
            resolve({ id: usId, username, email, token: jwtToken });
        });
    });
};

async function loginUser({ email, password }) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * FROM userAccounts WHERE email = ?
        `;

        userAccountsDB.get(sql, [email], async (err, user) => {
            if (err) return reject(err);
            if (!user) return reject(new Error('User not found'));

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return reject(new Error('Invalid password'));

            const jwtToken = generateJwtToken(user.id);

            resolve({
                id: user.id,
                username: user.username,
                email: user.email,
                token: jwtToken
            });
        });
    });
};


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

export { userRegistration, loginUser, getOneUser, deleteUser }