import { elementHtml } from "@/utils";
import { anchorAttributes } from "@/constants";
import { router } from "@/routes";

export class navLink {
    element = new elementHtml();
    /**
     * 
     * @param {String} icon 
     * @param {String} iconClick 
     * @param {String} label 
     * @param {String} to 
     * @param {String} componentPath 
     */
    constructor(icon, iconActive, label, to, componentPaths = []) {
        this.checkPath = window.location.pathname;
        this.icon = icon;
        this.label = label;
        this.to = to;
        this.label = label;
        this.iconActive = iconActive;
        //check path for icon
        this.componentPaths = componentPaths;
        if (this.checkPath === this.to) {
            this.icon = this.iconActive;
        }
        /**
         * navigation link
         */
        this.navlink = this.element.aElement(this.linkActiveClassName(), this.to);
        this.navlink.setAttribute(anchorAttributes.navLink, "");

        /**
         * navigation link icon
         */
        this.navLinkIcon = this.element.imgElement(this.icon,"icon","");
        /**
         * navigation link text
         */
        this.navLinkLabel = this.element.spanElement("",this.label);

        this.navlink.appendChild(this.navLinkIcon);
        this.navlink.appendChild(this.navLinkLabel);

        /**
         * handle click and handle active navigation
         */
        this.navlink.addEventListener("click", this.handleNavLinkClick.bind(this));
        window.addEventListener("urlChanged", this.updateNavLinkClassName.bind(this));
        console.log("reload nav link");
    }

    /**
     * 
     * @returns {String} className  
     */
    linkActiveClassName() {
        const isActive = this.componentPaths.find((path) => {
            return this.matchPath(location.pathname, path, false);
        });
        return `nav-link ${isActive ? "nav-link-active" : ""}`;
    }

    /**
     * update class name
     */
    updateNavLinkClassName() {
        this.navlink.className = this.linkActiveClassName();
    }
    /**
     * 
     * @param {*} event 
     */
    handleNavLinkClick(event) {
        event.preventDefault();
        router.pushState(this.navlink.getAttribute("href"));
    }
    /**
     * 
     * @param {*} url 
     * @param {*} path 
     * @param {*} isEqualLength 
     * @returns 
     */
    matchPath(url, path, isEqualLength = true) {
        const urlSegments = url.split("/");
        const pathSegments = path.split("/");

        if (urlSegments.length !== pathSegments.length && isEqualLength) {
            return false;
        }

        const len = Math.min(urlSegments.length, pathSegments.length);

        for (let i = 0; i < len; i++) {
            if (
                urlSegments[i] !== pathSegments[i] &&
                !pathSegments[i].startsWith(":")
            ) {
                return false;
            }
        }

        return true;
    }
    render() {
        return this.navlink;
    }
}
