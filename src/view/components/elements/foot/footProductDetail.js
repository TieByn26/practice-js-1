import { elementHtml } from "@/utils";
import { button } from "../button";
import { ic_save, ic_cross } from "@/constants";

const element = new elementHtml();
export class FootProductDetail{
    constructor(){
        this.container = element.divELement("productde-container-foot");
        this.initFoot();
    }
    createButton(text = "", icon = "") {
        const button = document.createElement("button");
        button.appendChild(element.imgElement(icon, "icon", ""));
        button.appendChild(element.spanElement("",text));  
        button.className = "save-button";
        button.setAttribute('unactive', '');
        return button;
    };
    initFoot(){
        const divSpan = element.divELement("productde-container-foot_span");
        divSpan.append(
            element.spanElement("","Product Completion"),
            element.spanElement("","100%")
        );
        const divButton = element.divELement("productde-container-foot_button");
        const saveButton = this.createButton("Save Product",ic_save);
        divButton.append(
            new button().render("button-white",{to:"/product",label:"Cancel",icon:ic_cross}),
            saveButton
        );
        this.container.append(divSpan, divButton);
    }
    render(){
        return this.container;
    }
}