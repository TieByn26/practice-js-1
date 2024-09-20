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
        this.initNavigationLink();
        console.log("reload nav list");
    }

    /**
     * create list navigation link
     * @returns {ul} lis nav
     */
    initNavigationLink() {
        const navigationLinkItem = [
            { 
                icon: ic_dashboard_gray, 
                iconActive: ic_dashboard, 
                to: routesPath.home, 
                label: `Dashboard` ,
                componentPath: ["/"]
            },
            { 
                icon: ic_shoping, 
                iconActive: ic_product_blue, 
                to: routesPath.product, 
                label: `Product`,
                componentPath: ["/product", "/product-detail/:productId", "/add-product"] 
            },
            {
                icon: ic_cart_menu,
                iconActive: ic_cart_white, 
                to: routesPath.order, 
                label: `Order`,
                componentPath: ["/order","/order-detail/:orderId"]
            },
            { 
                icon: ic_customer,
                iconActive: ic_customer_white, 
                to: routesPath.customer, 
                label: `Customers`,
                componentPath: ["/customer","/customer-detail/:customerId"]
            },
            { 
                icon: ic_seller, 
                iconActive: ic_seller, 
                to: routesPath.seller, 
                label: `Seller` ,
                componentPath: ["/seller"]
            },
            { 
                icon: ic_analysis, 
                to: "//",
                iconActive: ic_analysis, 
                label: `Analytics` ,
                componentPath: [""]
            },
            { 
                icon: ic_setting, 
                to: "//",
                iconActive: ic_setting, 
                label: `Setting` ,
                componentPath: [""]
            },
            { 
                icon: ic_support, 
                to: "//",
                iconActive: ic_support, 
                label: `Support` ,
                componentPath: [""]
            }
        ];

        this.ul.appendChild(this.logoApp());
        
        navigationLinkItem.forEach(item => {
            const li = document.createElement("li");
            const navlink = new navLink(
                item.icon,
                item.iconActive,
                item.label,
                item.to,
                item.componentPath
            );
            li.appendChild(navlink.render()); 
            this.ul.appendChild(li);
        });
    }

    /**
     * create logo of website
     * @returns {li} logo
     */
    logoApp() {
        const li = this.element.liElement("logo");
        const img = this.element.imgElement(ic_logo, "logo", "");
        const span = this.element.spanElement("", "Dashlab");
        li.appendChild(img);
        li.appendChild(span);
        return li;
    }

    render() {
        return this.ul;
    }
}
