import { elementHtml } from "@/utils";
import { Breadcrumb } from "../breadcrumb";
import { routesPath } from "@/constants";
import { button } from "../button";
import { ic_plus, ic_cross } from "@/constants";

const element = new elementHtml();
export class HeadCategoryAdd{
    constructor(){
        this.container = element.divELement("categoryad-container-head");
        this.initHead();
    }
    createButton(text = "", icon = "") {
        const button = document.createElement("button");
        button.appendChild(element.imgElement(icon, "icon", ""));
        button.appendChild(element.spanElement("",text));  
        button.className = "add-button";
        button.setAttribute("unactive","");
        return button;
    };
    initHead(){
        const breadcrumb = new Breadcrumb([routesPath.home, routesPath.categories, routesPath.addcategory],"Add Category").render();
        const buttonContainer = element.divELement("categoryad-container-head_button");
        const addButton = this.createButton("Add Category",ic_plus);
        buttonContainer.append(
            new button().render("button-white",{to:"/categories",label:"Cancel",icon:ic_cross}),
            addButton
        );
        this.container.append(breadcrumb, buttonContainer);
    }
    render(){
        return this.container;
    }
}