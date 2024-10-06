import { breadcrumbs, getPath } from "@/constants";
import { Link } from "../link";
import { elementHtml } from "@/utils";
import { ic_chevron_down } from "@/constants";
/** USAGE:
 * const breadcrumb = new Breadcrumb(routePaths.home, routePaths.products, ...);
 * this.container.append(breadcrumb.render());
 */
const element = new elementHtml();
export class Breadcrumb{
    constructor(routePaths, title){
        this.routePaths = routePaths;
        this.container = element.divELement("breadcrumb-container");
        //title page
        this.title = element.spanElement("breadcrumb-title",title);
        //breadcrumb
        this.breadcrumb = element.divELement("breadcrumb-attributes");
        this.initBreadcrumbLink();
        this.staticBreadcrumb = element.spanElement("static-breadcrumb",breadcrumbs[routePaths.slice(-1)]);
        this.breadcrumb.appendChild(this.staticBreadcrumb);
        // this.staticBreadcrumb = new Link(getPath[routePaths.slice(-1)],breadcrumbs[routePaths.slice(-1)]);
        this.container.append(this.title, this.breadcrumb);
    }
    initBreadcrumbLink(){
        this.routePaths.forEach((path, index) => {
            if (index === this.routePaths.length -1) {
                return;
            }
            const link = new Link(getPath[path](),breadcrumbs[path]).render();
            link.className = "breadcrumb-link";
            this.breadcrumb.append(link, this.getSeparator());
        })
    }
    getSeparator(){
        const separator = element.imgElement(ic_chevron_down,"icon","breadcrumb-separator");
        // separator.textContent = ">";
        return separator;
    }
    render(){
        return this.container;
    }
}
