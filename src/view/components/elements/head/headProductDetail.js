import { elementHtml } from "@/utils";
import { Breadcrumb } from "../breadcrumb";
import { routesPath } from "@/constants";
import { button } from "../button";
import { ic_cross, ic_save} from "@/constants";

const element = new elementHtml();
export class HeadProductDetail{
    constructor(){
        this.container = element.divELement("productde-head-container");
        this.initHead();
    }
    createButton(text = "", icon = "") {
        const button = document.createElement("button");
        button.appendChild(element.imgElement(icon, "icon", ""));
        button.appendChild(element.spanElement("",text));  
        button.className = "save-button";
        button.setAttribute('unactive', '');
        return button;
    };
    initHead(){
        const breadcrumb = new Breadcrumb([routesPath.home, routesPath.product, routesPath.productdetail],"Product Details").render();
        const buttonContainer = element.divELement("productde-head-container_button");
        const saveButton = this.createButton("Save Product",ic_save);
        buttonContainer.append(
            new button().render("button-white",{to:"/product",label:"Cancel",icon:ic_cross}),
            saveButton
        );
        this.container.append(breadcrumb, buttonContainer);
    }
    render(){
        return this.container;
    }
}
