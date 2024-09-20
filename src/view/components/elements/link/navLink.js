import { elementHtml } from "@/utils";
import { anchorAttributes } from "@/constants";
import { router } from "@/routes";

export class navLink {
    element = new elementHtml();

    /**
     * @param {String} icon 
     * @param {String} iconActive 
     * @param {String} label 
     * @param {String} to
     * @param {String[]} componentPaths 
     */
    constructor(icon, iconActive, label, to, componentPaths = []) {
        // set the icon based on the current URL path
        this.icon = window.location.pathname === to ? iconActive : icon;
        this.to = to;
        this.componentPaths = componentPaths;

        // create the link element with the label
        this.navlink = this.createLink(label);
        this.addEvents();
    }

    /**
     * @param {String} label 
     * @returns {HTMLElement} 
     */
    createLink(label) {
        const link = this.element.aElement(this.getActiveClass(), this.to);
        link.setAttribute(anchorAttributes.navLink, "");
        link.append(
            this.element.imgElement(this.icon, "icon", ""), 
            this.element.spanElement("", label) 
        );
        return link;
    }

    /**
     * @returns {String}
     */
    getActiveClass() {
        const isActive = this.componentPaths.some(path => this.matchPath(location.pathname, path));
        return `nav-link ${isActive ? "nav-link-active" : ""}`;
    }

    /**
     * Adds event listeners for handling clicks and URL changes
     */
    addEvents() {
        // Handle click event to prevent page reload and push new state
        this.navlink.addEventListener("click", (e) => {
            e.preventDefault();
            router.pushState(this.to);
        });
        // Update the class name when the URL changes
        window.addEventListener("urlChanged", () => {
            this.navlink.className = this.getActiveClass();
        });
    }
    matchPath(url, path) {
        const urlSegments = url.split("/");
        const pathSegments = path.split("/");
        return pathSegments.every((seg, i) => seg.startsWith(":") || seg === urlSegments[i]);
    }
    render() {
        return this.navlink;
    }
}
