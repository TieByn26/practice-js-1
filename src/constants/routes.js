import {menu, home, order, product, seller, categories} from "@/view";

export const routesPath = {
    home: "/",
    order: "/order",
    product: "/product",
    seller: "/seller",
    categories: "categories",
    menu: "/menu"
};

export const routeComponents = {
    [routePaths.home]: home(),
    [routePaths.product]: product(),
    [routePaths.order]: order(),
    [routePaths.menu]: menu(),
    [routePaths.categories]: categories(),
    [routePaths.seller]: seller() 
  };
        