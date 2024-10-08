export const endpointUrl = {
    // PRODUCT ENDPOINT
    getProducts(){
        return `/products`;
    },
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
    getTopSelling() {
        return `/products?_sort=sales&_order=desc`;
    },
    /**
     * @returns {string} URL to get top sale for location
     */
    getTopSale() {
        return `/topSaleLocation`;
    },
    // CATEGORY ENDPOINT
    getListCategory(page) {
        const limit = 10;
        return `/categories?_limit=${limit}&_page=${page}`;
    },

    getCategory(id) {
        return `/categories/${id}`;
    },
    getCategories(){
        return `/categories`;
    },

    //ORDER ENDPOINT 
    /**
     * @param {number} page 
     * @returns {string}
     */
    getListOrder(page) {
        const limit = 10;
        return `/orders?_limit=${limit}&_page=${page}`;
    },

    getOrder(id){
        return `/orders/${id}`;
    },

    getListOrderIdCus(id, page) {
        const limit = 5;
        return `/orders?customerId=${id}&_limit=${limit}&_page=${page}`;
    },

    getAllOrder(){
        return `/orders`
    },

    // CUSTOMER ENDPOINT
    getListCustomer(page){
        const limit = 10;
        return `/customers?_limit=${limit}&_page=${page}`;
    },

    getCustomer(id){
        return `/customers/${id}`;
    },
    getCustomers(){
        return `/customers`;
    }
};
