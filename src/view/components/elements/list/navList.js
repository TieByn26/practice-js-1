    import { navLink } from "../link";
    import { elementHtml } from "@/utils";
    import {
        ic_dashboard, ic_analysis, ic_seller,
        ic_cart_menu, ic_shoping, ic_customer,
        ic_logo, ic_setting, ic_support,
        ic_cart_white, ic_product_blue, ic_dashboard_gray,
        ic_customer_white, routesPath,
        pic_white, ic_chevron_down, ic_chevron_up
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
                { icon: ic_shoping, iconActive: ic_product_blue, to: routesPath.product, label: "Product", componentPath: ["/product", "/product-detail/:productId", "/add-product"],chevdown: ic_chevron_down,chevup: ic_chevron_up, isTrue:true},
                { icon: ic_cart_menu, iconActive: ic_cart_white, to: routesPath.order, label: "Order", componentPath: ["/order","/order-detail/:orderId"] },
                { icon: ic_customer, iconActive: ic_customer_white, to: routesPath.customer, label: "Customers", componentPath: ["/customer","/customer-detail/:customerId"] },
                { icon: ic_seller, iconActive: ic_seller, to: routesPath.seller, label: "Seller", componentPath: ["/seller"] },
                { icon: ic_analysis, iconActive: ic_analysis, to: "/analysis", label: "Analytics", componentPath: ["/analysis"] },
                { icon: ic_setting, iconActive: ic_setting, to: "/setting", label: "Setting", componentPath: ["/setting"] },
                { icon: ic_support, iconActive: ic_support, to: "/support", label: "Support", componentPath: ["/support"] }
            ];

            //minimizes reflows and improves performance when inserting multiple elements into the DOM.
            const fragment = document.createDocumentFragment();
            fragment.appendChild(this.createLogo());

            navigationLinkItems.forEach(item => {
                const li = document.createElement("li");
                if (item.isTrue){
                    const navlink = new navLink(item.icon, item.iconActive, item.label, item.to, item.componentPath, item.chevdown, item.chevup);
                    li.appendChild(navlink.render());
                    fragment.appendChild(li);
                    if (item.isTrue && navlink.render().classList.contains('nav-link-active')){
                        const li1 = document.createElement("li");
                        const componentPathPro = ["/product", "/product-detail/:productId", "/add-product"];
                        const navlink1 = new navLink(pic_white,ic_product_blue,"Product List",routesPath.product,componentPathPro).render();
                        li1.appendChild(navlink1);
                        fragment.appendChild(li1);
                        const li2 = document.createElement("li");
                        const componentPathCate = ["/categories", "/category-detail/:categoryId", "/add-category"];
                        const navlink2 = new navLink(pic_white,ic_product_blue,"Categories",routesPath.categories,componentPathCate).render();
                        li2.appendChild(navlink2);
                        fragment.appendChild(li2);
                    }
                    return;
                }
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
