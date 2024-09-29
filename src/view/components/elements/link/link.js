import { anchorAttributes } from "@/constants";
import { router } from "@/routes";

/** USAGE
 * const link = new Link(to);
 * const componentLink = link.render();
 */
export class link {
    /**
     * 
     * @param {String} to 
     */
    constructor(to){
        this.link = document.createElement("a");
        this.link.href = to;
        this.link.setAttribute(anchorAttributes.link,"");

        // handle click event to prevent page loading
        this.link.addEventListener("click", this.handleLinkClick.bind(this));
    }
    /**
     * prevent default action ( load page ), update new path
     * @param {*} event 
     */
    handleLinkClick(event){
        event.preventDefault();
        router.pushState(this.link.getAttribute("href"));
    }
    render(){
        return this.link;
    }
}