
import { router } from "@/routes";

export const routesPath = {
    home: "/",
    product: "/product",
    addproduct: "/add-product",
    productdetail: "/product-detail/:productId",
    categories: "/categories",
    addcategory: "/add-category",
    categorydetail: "/category-detail/:categoryId",
    order: "/order",
    orderdetail: "/order-detail/:orderId",
    customer: "/customer", 
    customerdetail: "/customer-detail/:customerId",
    seller: "/seller"
};

/**
 * Replace param in path with actual value from URL
 * @param {String} path - Route path containing param
 * @param {String} paramKey - The param key to be replaced (e.g., productId, categoryId)
 * @returns {String} - Route path with param replaced
 */
const replaceParamInPath = (path, paramKey) => {
    const params = router.extractParams(location.pathname, path);
    return path.replace(`:${paramKey}`, params[paramKey]);
};

export const getPath = {
    [routesPath.home]: () => routesPath.home,
    [routesPath.product]: () => routesPath.product,
    [routesPath.addproduct]: () => routesPath.addproduct,
    [routesPath.productdetail]: () => replaceParamInPath(routesPath.productdetail, "productId"),
    [routesPath.categories]: () => routesPath.categories,
    [routesPath.addcategory]: () => routesPath.addcategory,
    [routesPath.categorydetail]: () => replaceParamInPath(routesPath.categorydetail, "categoryId"),
    [routesPath.order]: () => routesPath.order,
    [routesPath.orderdetail]: () => replaceParamInPath(routesPath.orderdetail, "orderId"),
    [routesPath.customer]: () => routesPath.customer,
    [routesPath.customerdetail]: () => replaceParamInPath(routesPath.customerdetail, "customerId"),
    [routesPath.seller]: () => routesPath.seller
};
// export const routeComponents = {
//     [routesPath.home]: new home().render(),
//     [routesPath.product]: new product().render(),
//     [routesPath.order]: new order().render(),
//     [routesPath.categories]: new categories().render(),
//     [routesPath.seller]: new seller().render(),
//     [routesPath.customer]: new customer().render(),
//   };
        
