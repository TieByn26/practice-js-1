import { anchorAttributes } from "@/constants";
import { router } from "@/routes";

/** USAGE
 * const link = new Link(to, text);
 * const componentLink = link.render();
 */
export class Link {
    /**
     * 
     * @param {String} to - target URL 
     * @param {String} text - optional text for the link element
     */
    constructor(to, text = '') {
        this.link = this.createLinkElement(to, text);
    }

    /**
     * Create and configure the link element
     * @param {String} to 
     * @param {String} text 
     * @returns {HTMLElement} - anchor element
     */
    createLinkElement(to, text) {
        const link = document.createElement("a");
        link.href = to;
        link.textContent = text;  // Set text if provided
        link.setAttribute(anchorAttributes.link, "");

        // Bind event listener
        link.addEventListener("click", this.handleLinkClick.bind(this));
        return link;
    }

    /**
     * Handle click event to prevent page reload and update new path
     * @param {Event} event 
     */
    handleLinkClick(event) {
        event.preventDefault();
        router.pushState(this.link.getAttribute("href"));
    }

    /**
     * Render the anchor element
     * @returns {HTMLElement} - the link element
     */
    render() {
        return this.link;
    }
}