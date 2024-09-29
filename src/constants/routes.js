
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
    customer : "/customer", 
    customerdetail: "/customer-detail/customerId",
    seller: "/seller"
};
export const getPath = {
    [routesPath.home]: () => routesPath.home,
    [routesPath.product]: () => routesPath.product, 
    [routesPath.addproduct]: () => routesPath.addproduct,
    [routesPath.productdetail]() {
        const {productId} = router.extractParams(
            location.pathname,
            routesPath.productdetail
        );
        return routesPath.productdetail.replace(":productId", productId);
    },
    [routesPath.categories]: () => routesPath.categories,
    [routesPath.addcategory]: () => routesPath.addcategory,
    [routesPath.categorydetail] () {
        const {categoryId} = router.extractParams(
            location.pathname,
            routesPath.categorydetail
        );
        return routesPath.categorydetail.replace("categoryId", categoryId);
    },
    [routesPath.order]: () => routesPath.order,
    [routesPath.orderdetail] () {
        const {orderId} = router.extractParams(
            location.pathname,
            routesPath.orderId
        );
        return routesPath.categorydetail.replace("orderId", orderId);
    },
    [routesPath.customer]: () => routesPath.customer,
    [routesPath.customerdetail] () {
        const {customerId} = router.extractParams(
            location.pathname,
            routesPath.customerdetail
        );
        return routesPath.categorydetail.replace("customerId", customerId);
    }, 
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
        
