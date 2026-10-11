import express from 'express';
import cors from 'cors';
import initDB from '../database/initDB.js';
import userAccountsRoute from './routes/userAccountsRoute.js';
import productsRoute from './routes/productsRoute.js';
import { PORT } from './config.js';
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

initDB();

app.use(cookieParser());

app.use('/userAccount', userAccountsRoute);
app.use('/products', productsRoute);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server open: ${PORT}`);
  }
});