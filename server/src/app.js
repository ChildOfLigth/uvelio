import express from 'express';
import { PORT } from './config.js';
import initDB from '../database/initDB.js';
import userAccountsRoute from './routes/userAccountsRoute.js';
import productsRoute from './routes/productsRoute.js';

const app = express();
app.use(express.json());

initDB();

app.use('/userAcount', userAccountsRoute);
app.use('/products', productsRoute);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server open: ${PORT}`);
  }
});
