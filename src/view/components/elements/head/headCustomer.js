import { elementHtml } from "@/utils";
import { routesPath } from "@/constants";
import { Breadcrumb } from "../breadcrumb";
import { button } from "../button";
import { ic_export, ic_plus , ic_filter, ic_search} from "@/constants";

const element = new elementHtml();
export class HeadCustomer{
    constructor(){
        this.container = element.divELement("customer-head-container");
        this.initHeadTop();
        this.initHeadBottom();
    }
    initHeadTop(){
        const headTop = element.divELement("customer-head-container_top");
        const breadcrumb = new Breadcrumb([routesPath.home, routesPath.customer],"Customer").render();

        const buttonContainer = element.divELement("customer-head-container_top-button");
        buttonContainer.append(
            new button().render("button-middle",{to:"/404",label:"Export",icon:ic_export}),
            new button().render("button-blue",{to:"/404",label:"Add Customer",icon:ic_plus})
        );
        headTop.append(breadcrumb, buttonContainer);
        this.container.appendChild(headTop);

    }
    initHeadBottom(){
        const headBottom = element.divELement("customer-head-container_bottom");
        const search = element.divELement("customer-head-container_bottom-search");
        const img = element.imgElement(ic_search,"icon","");
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Search customer. . .";
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