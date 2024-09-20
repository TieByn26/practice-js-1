import { home, product, addproduct, productdetail
    ,categories, addcategory, categorydetail
    ,order,orderdetail,customer,customerdetail,seller
 } from "@/view";
import { rootLayout } from "@/view";

const createRoute = (path, component) => ({ path, component });

export const routes = [
    {
        path: "",
        component: rootLayout,
        children: [
            createRoute("/", home),
            createRoute("/product", product),
            createRoute("/add-product", addproduct),
            createRoute("/product-detail/:productId", productdetail),
            createRoute("/categories", categories),
            createRoute("/add-category", addcategory),
            createRoute("/category-detail/:categoryId", categorydetail),
            createRoute("/order", order),
            createRoute("/order-detail/:orderId", orderdetail),
            createRoute("/customer", customer),
            createRoute("/customer-detail/:customerId", customerdetail),
            createRoute("/seller", seller)
        ]
    }
]
