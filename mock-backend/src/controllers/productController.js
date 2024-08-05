const { categoryFilter } = require('../utils/categoryFilter')

const { managerProducts, managerProduct } = require("../data/managerProducts");
const products = require("../data/mokedData");
const { sortProducts } = require("../utils/sortUtils");
const { filteredProductsBySearchQuery } = require("../utils/filterUtils");

const validateNumberQueryParam = (value, defaultValue = 0) => {
  return !isNaN(value) && Number(value) >= 0 ? Number(value) : defaultValue;
};

const getAllProducts = (req, res) => {
  const page = validateNumberQueryParam(req.query.page);
  const size = validateNumberQueryParam(req.query.size, 10);
  const {sort, tags: category} = req.query

  let sortedProducts = sort ? sortProducts(products, sort) : products;
  const skip = page * size;
  const limit = (page + 1) * size;

  const slicedProducts = sortedProducts.slice(skip, limit);

  const finalProducts = categoryFilter(category, slicedProducts)

  const response = {
    content: finalProducts,
    totalPages: Math.ceil(products.length / size),
    totalElements: products.length,
  };

  res.json(response);
};

const getProductById = (req, res) => {
  // @TODO: add lang param usage
  const { productId } = req.params;
  const product = products.find((product) => product.id === productId);

  if (!product) {
    res.status(404).json({ status: 404, message: "Product not found" });
    return;
  }

  const transformedProduct = {
    image: product.image,
    quantity: 10,
    price: product.price,
    tags: product.tags,
    name: product.name,
    description: product.description,
  };

  res.json(transformedProduct);
};

const getAllManagerProducts = (req, res) => {
  const page = validateNumberQueryParam(req.query.page);
  const size = validateNumberQueryParam(req.query.size, 10);

  const skip = page * size;
  const limit = (page + 1) * size;

  const slicedProducts = managerProducts.content.slice(skip, limit);

  const response = {
    ...managerProducts,
    content: slicedProducts,
    totalPages: Math.ceil(managerProducts.content.length / size),
    totalElements: managerProducts.content.length,
  };

  return res.json(response);
};

const createProduct = (req, res) => {
  res.status(201).json();
};

const getProductByIdForManager = (req, res) => {
  return res.json(managerProduct);
};

const searchProducts = (req, res) => {
  const { searchQuery, sort } = req.query;
  const page = validateNumberQueryParam(req.query.page);
  const size = validateNumberQueryParam(req.query.size, 10);

  let filteredProducts = filteredProductsBySearchQuery(products, searchQuery);

  if (sort) {
    filteredProducts = sortProducts(filteredProducts, sort);
  }

  const skip = 1;
  const limit = (page + 1) * size;
  const paginatedProducts = filteredProducts.slice(skip, limit);

  const response = {
    totalElements: filteredProducts.length,
    totalPages: Math.ceil(filteredProducts.length / size),
    first: page === 0,
    last: page === Math.ceil(filteredProducts.length / size) - 1,
    number: page,
    numberOfElements: paginatedProducts.length,
    size: size,
    empty: paginatedProducts.length === 0,
    content: paginatedProducts.map((product) => ({
      id: product.id,
      image: product.image,
      name: product.name,
    })),
  };

  res.json(response);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  getAllManagerProducts,
  searchProducts,
  getProductByIdForManager,
};
