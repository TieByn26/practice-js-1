import { elementHtml } from "@/utils";
import { anchorAttributes } from "@/constants";
import { router } from "@/routes";

export class navLink {
    element = new elementHtml();

    constructor(icon, iconActive, label, to, componentPaths = [], chevdown, chevup) {
        if (chevdown && chevup){
            this.chevdown = chevdown;
            this.chevup = chevup;
        }
        this.icon = icon;
        this.iconActive = iconActive;
        this.label = label;
        this.to = to;
        this.componentPaths = componentPaths;
        this.navlink = this.createLink(label);
        this.addEvents();
    }

    createLink(label) {
        const link = this.element.aElement(this.getActiveClass(), this.to);
        link.setAttribute(anchorAttributes.navLink, "");
        link.append(
            this.element.imgElement(this.icon, "icon", ""),
            this.element.spanElement("", label)
        );
        if (this.chevdown){
            link.appendChild(this.element.imgElement(this.chevdown, "icon","chev"));
        }
        return link;
    }

    getActiveClass() {
        const isActive = this.isActive();
        if (isActive) {
            this.icon = this.iconActive;
            if (this.chevdown) {
                this.chevdown = this.chevup;
            }
        }
        return `nav-link ${isActive ? "nav-link-active" : ""}`;
    }

    isActive() {
        const currentPath = location.pathname;
        const catePath = ["/categories", "/category-detail/:categoryId", "/add-category"];
        if (this.label === "Product") {
            return this.componentPaths.some(path => this.matchPath(currentPath, path)) ||
                   currentPath.startsWith("/product") ||
                   catePath.some(path => this.matchPath(currentPath, path))
        }
        if (this.label === "Product List") {
            return this.componentPaths.some(path => this.matchPath(currentPath, path)) ||
                   currentPath.startsWith("/product");
        }
        if (this.label === "Categories") {
            return this.componentPaths.some(path => this.matchPath(currentPath, path));
        }

        return this.componentPaths.some(path => this.matchPath(currentPath, path));
    }

    matchPath(url, path) {
        const urlSegments = url.split("/");
        const pathSegments = path.split("/");
        return pathSegments.every((seg, i) => seg.startsWith(":") || seg === urlSegments[i]);
    }

    addEvents() {
        this.navlink.addEventListener("click", (e) => {
            e.preventDefault();
            router.pushState(this.to);
        });

        // window.addEventListener("urlChanged", () => {
        //     this.updateActiveState();
        // });
    }

    // updateActiveState() {
    //     const isActive = this.isActive();
    //     this.navlink.className = `nav-link ${isActive ? "nav-link-active" : ""}`;
    //     this.navlink.querySelector('img').src = isActive ? this.iconActive : this.icon;
    // }

    render() {
        return this.navlink;
    }
}