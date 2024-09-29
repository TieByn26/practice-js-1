import { Breadcrumb } from "../breadcrumb";
import { button } from "../button";
import { elementHtml } from "@/utils";
import { routesPath} from "@/constants";
import { ic_chevron_down, ic_export, ic_receipt } from "@/constants";
import { OrderController } from "@/controllers";
import { router } from "@/routes";

const element = new elementHtml();
export class HeadOrderDetail{
    constructor(order) {
        this.container = element.divELement("head-order-detail-container");
        this.initHeadDetail(order);
    }
    initHeadDetail(order){
        const breadcrumb = new Breadcrumb([routesPath.home, routesPath.order, routesPath.orderdetail],"Order Details");
        const buttonContainer = element.divELement("button-container");
        buttonContainer.append(
            new button().render("button-middle",{to:"/404",label:"Export",icon:ic_export}),
            new button().render("button-blue",{to:"/404",label:"Invoice",icon:ic_receipt})
        );
        this.container.appendChild(breadcrumb.render());
        this.dropdown(order);
        this.container.appendChild(element.imgElement(ic_chevron_down, "icon", "chevron"));
        this.container.appendChild(buttonContainer);
    }
    dropdown(order){
        const options = ["Processing","Cancelled","Shiped","Delivered"]
        const dropdow = document.createElement("select");
        dropdow.className = "order-dropdow";
        options.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.text = option;
            dropdow.appendChild(optionElement); 
        });
        const selectedValue = order.status;
        dropdow.querySelectorAll('option').forEach(option => {
            if (option.value === selectedValue) {
                option.selected = true; 
            } else {
                option.selected = false;
            }
        });
        dropdow.addEventListener('change', async (event) => {
            await OrderController.updateStatus(router.getParam().orderId,{status: event.target.value});
            router.pushState(window.location.pathname);
        });
        this.container.appendChild(dropdow);
    }
    render(){
        return this.container;
    }
}
