import { navActive } from "../link";
import {
    ic_dashboard, ic_analysis, ic_seller,
    ic_cart_menu, ic_shoping, ic_customer,
    ic_logo, ic_setting, ic_support, routesPath,
    ic_cart_white, ic_product_blue, ic_dashboard_gray, ic_customer_white
} from "@/constants";

export class NavList {
    navItems = [
        { icon: ic_dashboard_gray, icon2: ic_dashboard, to: routesPath.home, label: `Dashboard` },
        { icon: ic_shoping, icon2: ic_product_blue, to: routesPath.product, label: `Product` },
        { icon: ic_cart_menu, icon2: ic_cart_white, to: routesPath.order, label: `Order` },
        { icon: ic_customer, icon2: ic_customer_white, to: routesPath.customer, label: `Customers` },
        { icon: ic_seller, icon2: ic_seller, to: routesPath.seller, label: `Seller` },
        { icon: ic_analysis, icon2: ic_analysis, to: routesPath.analytics, label: `Analytics` },
        { icon: ic_setting, icon2: ic_setting, label: `Setting` },
        { icon: ic_support, icon2: ic_setting, label: `Support` }
    ];

    constructor() {}

    logoApp() {
        const li = document.createElement('li');
        li.className = 'logo';

        const img = document.createElement('img');
        img.src = ic_logo;
        img.alt = 'logo';

        const span = document.createElement('span');
        span.textContent = 'Dashlab';

        li.appendChild(img);
        li.appendChild(span);

        return li;
    }

    navListMethod() {
        const ul = document.createElement('ul');

        ul.appendChild(this.logoApp());

        this.navItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = navActive(item);
            ul.appendChild(li);
        });

        return ul;
    }

    render() {
        return this.navListMethod().outerHTML;
    }
}
