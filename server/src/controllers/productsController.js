import { getAllData, getOneValue } from '../services/productsService.js';

export const getAllProductsController = async (req, res) => {
    try {
        const products = await getAllData();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getOneProductController = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await getOneValue(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
