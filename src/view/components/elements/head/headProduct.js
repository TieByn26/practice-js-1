import { elementHtml } from "@/utils";
import { button } from "../button";
import { ic_search, ic_filter, ic_plus, ic_export,ic_calendar, routesPath } from "@/constants";
import { Breadcrumb } from "../breadcrumb";

const element = new elementHtml();
export class HeadProduct{
    constructor(){
        this.container = element.divELement("product-head-container");
        this.initHeadTop();
        this.initHeadBottom();
    }
    initHeadTop(){
        const headTop = element.divELement("product-head-container_top");
        const breadcrumb = new Breadcrumb([routesPath.home, routesPath.product],"Product").render();

        const buttonContainer = element.divELement("product-head-container_top-button");
        buttonContainer.append(
            new button().render("button-middle",{to:"/404",label:"Export",icon:ic_export}),
            new button().render("button-blue",{to:"/add-product",label:"Add Product",icon:ic_plus})
        );
        headTop.append(breadcrumb, buttonContainer);
        this.container.appendChild(headTop);

    }
    initHeadBottom(){
        const headBottom = element.divELement("product-head-container_bottom");
        const search = element.divELement("product-head-container_bottom-search");
        const img = element.imgElement(ic_search,"icon","");
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Search product. . .";
        search.append(img, input);
        const buttonContainer = element.divELement("button-container");
        buttonContainer.append(
            new button().render("button-white",{to:"/404",label:"Select Dates",icon:ic_calendar}), 
            new button().render("button-white",{to:"/404",label:"Filters",icon:ic_filter}));
        headBottom.append(search, buttonContainer);
        this.container.appendChild(headBottom);
    } 
    render(){
        return this.container;
    }
}