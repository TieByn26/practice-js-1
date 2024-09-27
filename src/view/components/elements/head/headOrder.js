import { elementHtml } from "@/utils"
import { button } from "../button";
import { Breadcrumb } from "../breadcrumb";
import { routesPath } from "@/constants";
import { ic_export, ic_plus, ic_filter, ic_calendar } from "@/constants";
import { tabchevron } from "../chevron";
const element = new elementHtml();
export class HeadOrder{
    constructor(){

    }
    static headTop(){
        const container = element.divELement("order-headtop-container");
        const breadcrumb = new Breadcrumb([routesPath.home ,routesPath.order],"Order");
        const buttonContainer = element.divELement("button-container");
        buttonContainer.append(
            new button().render("button-middle",{to:"/404",label:"Export",icon:ic_export}), 
            new button().render("button-blue",{to:"/404",label:"Add Order",icon:ic_plus}));
        container.append(breadcrumb.render(), buttonContainer);
        return container;
    }
    static headBottom(){
        const container = element.divELement("order-headbottom-container");
        const tabContainer = element.divELement("order-container-chevron");
        const tab = new tabchevron();
        tabContainer.appendChild(tab.render());

        const buttonContainer = element.divELement("button-container");
        buttonContainer.append(
            new button().render("button-white",{to:"/404",label:"Select Dates",icon:ic_calendar}), 
            new button().render("button-white",{to:"/404",label:"Filters",icon:ic_filter}));
        container.append(tabContainer, buttonContainer);
        return container;
    }
}
 