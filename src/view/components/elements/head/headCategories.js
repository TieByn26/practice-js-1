import { elementHtml } from "@/utils";
import { Breadcrumb } from "../breadcrumb";
import { routesPath } from "@/constants";
import { button } from "../button";
import { ic_export, ic_plus,  ic_filter, ic_search } from "@/constants";

const element = new elementHtml();
export class HeadCategories{
    constructor(){
        this.container = element.divELement("category-head-container");
        this.initHeadTop();
        this.initHeadBottom();
    }
    initHeadTop(){
        const headTop = element.divELement("category-head-container_top");
        const breadcrumb = new Breadcrumb([routesPath.home, routesPath.categories],"Categories").render();

        const buttonContainer = element.divELement("category-head-container_top-button");
        buttonContainer.append(
            new button().render("button-middle",{to:"/404",label:"Export",icon:ic_export}),
            new button().render("button-blue",{to:"/add-category",label:"Add Category",icon:ic_plus})
        );
        headTop.append(breadcrumb, buttonContainer);
        this.container.appendChild(headTop);

    }
    initHeadBottom(){
        const headBottom = element.divELement("category-head-container_bottom");
        const search = element.divELement("category-head-container_bottom-search");
        const img = element.imgElement(ic_search,"icon","");
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Search category. . .";
        search.append(img, input);
        headBottom.append(search, 
            new button().render("button-white",{to:"/404",label:"Filter",icon:ic_filter})
        );
        this.container.appendChild(headBottom);
    } 
    render(){
        return this.container;
    }
}
