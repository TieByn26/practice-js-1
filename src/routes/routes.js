import { home, product, addproduct, productdetail
    ,categories, addcategory, categorydetail
    ,order,orderdetail,customer,customerdetail,seller, rootlayout
 } from "@/view";

export const routes = [
    {
        path : "",
        component:  new rootlayout(),
        children: [
            { path: "/", component: home},
            { path: "/product", component: product},
            { path: "/add-product", component: addproduct},
            { path: "/product-detail/:productId", component: productdetail},
            { path: "/categories", component: categories},
            { path: "/add-category", component: addcategory},
            { path: "/category-detail/:categoryId", component: categorydetail},
            { path: "/order", component: order},
            { path: "/order-detail/:orderId", component: orderdetail},
            { path: "/customer", component: customer},
            { path: "/customer-detail/customerId", component: customerdetail},
            { path: "/seller", component: seller}
        ]
    }
]
