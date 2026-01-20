import express from 'express';
import { PORT } from './config.js';
import initDB from '../database/initDB.js';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

initDB();

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server open: ${PORT}`);
  }
});
