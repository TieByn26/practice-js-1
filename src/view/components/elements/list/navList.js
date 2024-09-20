import { navLink } from "../link";
import { elementHtml } from "@/utils";
import {
    ic_dashboard, ic_analysis, ic_seller,
    ic_cart_menu, ic_shoping, ic_customer,
    ic_logo, ic_setting, ic_support,
    ic_cart_white, ic_product_blue, ic_dashboard_gray,
    ic_customer_white, routesPath
} from "@/constants";

export class NavList {
    element = new elementHtml();
    
    constructor() {
        this.ul = document.createElement("ul");
        this.renderNavigationLinks();
    }

    /**
     * create lít of navigation link
     */
    renderNavigationLinks() {
        const navigationLinkItems = [
            { icon: ic_dashboard_gray, iconActive: ic_dashboard, to: routesPath.home, label: "Dashboard", componentPath: ["/"] },
            { icon: ic_shoping, iconActive: ic_product_blue, to: routesPath.product, label: "Product", componentPath: ["/product", "/product-detail/:productId", "/add-product"] },
            { icon: ic_cart_menu, iconActive: ic_cart_white, to: routesPath.order, label: "Order", componentPath: ["/order","/order-detail/:orderId"] },
            { icon: ic_customer, iconActive: ic_customer_white, to: routesPath.customer, label: "Customers", componentPath: ["/customer","/customer-detail/:customerId"] },
            { icon: ic_seller, iconActive: ic_seller, to: routesPath.seller, label: "Seller", componentPath: ["/seller"] },
            { icon: ic_analysis, iconActive: ic_analysis, to: "/analysis", label: "Analytics", componentPath: [""] },
            { icon: ic_setting, iconActive: ic_setting, to: "/setting", label: "Setting", componentPath: [""] },
            { icon: ic_support, iconActive: ic_support, to: "/support", label: "Support", componentPath: [""] }
        ];

        //minimizes reflows and improves performance when inserting multiple elements into the DOM.
        const fragment = document.createDocumentFragment();
        fragment.appendChild(this.createLogo());

        navigationLinkItems.forEach(item => {
            const li = document.createElement("li");
            const navlink = new navLink(item.icon, item.iconActive, item.label, item.to, item.componentPath);
            li.appendChild(navlink.render());
            fragment.appendChild(li);
        });

        this.ul.appendChild(fragment);
    }

    /**
     * create logo element
     * @returns {HTMLElement}
     */
    createLogo() {
        const li = this.element.liElement("logo");
        li.appendChild(this.element.imgElement(ic_logo, "logo", ""));
        li.appendChild(this.element.spanElement("", "Dashlab"));
        return li;
    }

    render() {
        return this.ul;
    }
}
