import {menu, home, order, product, seller, customer, analytics, categories} from "@/view";

export const routesPath = {
    home: "/",
    order: "/order",
    product: "/product",
    seller: "/seller",
    categories: "categories",
    menu: "/menu",
    customer : "/customer",
    analytics : "/analytics"
};

export const routeComponents = {
    [routesPath.home]: new home().render(),
    [routesPath.product]: new product().render(),
    [routesPath.order]: new order().render(),
    [routesPath.menu]: new menu().render(),
    [routesPath.categories]: new categories().render(),
    [routesPath.seller]: new seller().render(),
    [routesPath.customer]: new customer().render(),
    [routesPath.analytics]: new analytics().render()
  };
        