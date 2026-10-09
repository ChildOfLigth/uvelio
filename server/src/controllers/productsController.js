import {
  getLength,
  getProducts,
  getAdditionalData,
  searchProdsByName,
  gettingProdsForNewPage,
  getRangePrice,
  getReviewForProduct,
  getProductsById,
} from "../services/productsService.js";
import { VALID_CATEGORY_OPTIONS } from "../config.js";

function validateCategory(category) {
  if (
    category != null &&
    category != undefined &&
    typeof category === "string" &&
    VALID_CATEGORY_OPTIONS.includes(category)
  ) {
    return true;
  } else {
    return false;
  }
}

async function getLengthController(req, res) {
  try {
    const { selectedProductsCategory, selectedFilters } = req.query;

    if (!validateCategory(selectedProductsCategory)) {
      return res.status(400).json({
        error: "Incorrect or invalid data was received by the server.",
      });
    }

    const data = await getLength(selectedProductsCategory, selectedFilters);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function getProductsController(req, res) {
  try {
    const { selectedProductsCategory, selectedFilters } = req.query;

    if (!validateCategory(selectedProductsCategory)) {
      return res.status(400).json({
        error: "Incorrect or invalid data was received by the server.",
      });
    }

    const data = await getProducts(selectedProductsCategory, selectedFilters);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function searchProdsByNameController(req, res) {
  try {
    const { value,category } = req.query;
    const data = await searchProdsByName(value, category);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(err.status || 500).json(err.message);
  }
}

async function additionalLoadingOfProdsController(req, res) {
  try {
    const { selectedProductsCategory, totalNumOfProds, selectedFilters } =
      req.query;

    if (
      !validateCategory(selectedProductsCategory) ||
      totalNumOfProds === null ||
      totalNumOfProds === undefined
    ) {
      return res.status(400).json({
        error: "Incorrect or invalid data was received by the server.",
      });
    }

    const data = await getAdditionalData(
      selectedProductsCategory,
      totalNumOfProds,
      selectedFilters,
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getPriceRangeController(req, res) {
  try {
    const { selectedProductsCategory } = req.query;

    if (!validateCategory(selectedProductsCategory)) {
      return res.status(400).json({
        error: "Incorrect or invalid data was received by the server.",
      });
    }

    const data = await getRangePrice(selectedProductsCategory);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function gettingProdsForNewPageController(req, res) {
  try {
    const { selectedProductsCategory, totalNumOfProds, selectedFilters } =
      req.query;

    if (
      !validateCategory(selectedProductsCategory) ||
      totalNumOfProds === null ||
      totalNumOfProds === undefined
    ) {
      return res.status(400).json({
        error: "Incorrect or invalid data was received by the server.",
      });
    }

    const data = await gettingProdsForNewPage(
      selectedProductsCategory,
      totalNumOfProds,
      selectedFilters,
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getReviewForProductController(req, res) {
  try {
    const { productId } = await req.query;

    if (productId != undefined || productId != null) {
      const review = await getReviewForProduct(productId);
      res.status(200).json(review);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getProductsByIdController(req, res) {
  try {
    const arrIds = req.query.listProdIds;
    const data = await getProductsById(JSON.parse(arrIds));

    return res.status(200).json(data);
  } catch (err) {
    return res.status(err.status || 500).json(err.message);
  }
}

export {
  getLengthController,
  getProductsController,
  searchProdsByNameController,
  additionalLoadingOfProdsController,
  gettingProdsForNewPageController,
  getPriceRangeController,
  getReviewForProductController,
  getProductsByIdController,
};
