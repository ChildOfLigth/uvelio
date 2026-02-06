import { userAccountsDB } from "../../database/initDB.js";
import { loginUser, userRegistration } from "../services/userAccountsService.js";

const userRegistrationController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await userRegistration({ username, email, password });
        res.status(201).json(user);

    } catch (err) {
        if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        res.status(500).json({ error: err.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await loginUser({ email, password });
        res.json(user);

    } catch (err) {
        if (err.message === 'User not found' || err.message === 'Invalid password') {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(500).json({ error: err.message });
    }
};

const getOneUserController = async (req, res) => {
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

export { userRegistrationController, loginController, getOneUserController };