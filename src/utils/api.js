export const endpointUrl = {
    // PRODUCT ENDPOINT
    /**
     * @param {number} page - The page number to retrieve products from.
     * @returns {string} URL to get paginated list of products.
     */
    getListProduct(page) {
        const limit = 10;
        return `/products?_limit=${limit}&_page=${page}`;
    },
    /**
     * @param {number|string} id - The ID of the product to retrieve.
     * @returns {string} URL to get a single product by its ID.
     */
    getProduct(id) {
        return `/products/${id}`;
    },
    /**
     * Get top-selling products with 5 products per page
     * @param {number} page - The page number to retrieve products from
     * @returns {string} URL to fetch the top-selling products
     */
    getTopSelling(page) {
        const limit = 5; // Only 5 products per page
        return `/products?_sort=sales&_order=desc&_limit=${limit}&_page=${page}`;
    },
    /**
     * @returns {string} URL to get top sale for location
     */
    getTopSale() {
        return `/topSaleLocation`;
    }
    // CATEGORY ENDPOINT

    // CUSTOMER ENDPOINT
};
