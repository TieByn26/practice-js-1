import { elementHtml } from "@/utils";
import { Breadcrumb } from "../breadcrumb";
import { button } from "../button";
import { routesPath } from "@/constants";
import { ic_export, ic_plus } from "@/constants";

const element = new elementHtml();
export class HeadCustomerDetail{
    constructor(){
        this.container = element.divELement("customer-detail-container_head");
        this.initHead();
    }
    initHead(){
        const breadcrumb = new Breadcrumb([routesPath.home, routesPath.customer, routesPath.customerdetail],"Customer Details").render();

        const buttonContainer = element.divELement("customer-detail-container_head-button");
        buttonContainer.append(
            new button().render("button-middle",{to:"/404",label:"Export",icon:ic_export}),
            new button().render("button-blue",{to:"/404",label:"Add Customer",icon:ic_plus})
        );
        this.container.append(breadcrumb, buttonContainer);
    }
    render(){
        return this.container;
    }
}
