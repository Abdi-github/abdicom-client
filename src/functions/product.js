import axios from "axios";

export const createProduct = async (product, usertoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      usertoken,
    },
  });
};

export const getProductsByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
};

export const removeProduct = async (slug, usertoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      usertoken,
    },
  });

export const getSingleProduct = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
};

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const updateProduct = async (slug, product, usertoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      usertoken,
    },
  });

export const getProducts = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });

export const getProductsCount = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/products/total`);
};

export const starRating = async (productId, star, usertoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/rating/${productId}`,
    { star },
    {
      headers: {
        usertoken,
      },
    }
  );

// Related Products

export const getRelatedProduct = async (productId) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/product/related/${productId}`
  );
};

// Searching and Filtering

export const getProductsByFilter = async (arg) => {
  return await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
};