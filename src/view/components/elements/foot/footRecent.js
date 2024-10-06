import { elementHtml } from "@/utils";
import { ic_chevron } from "@/constants";
const element = new elementHtml();
export class FootRecent{
    constructor(){

    }
    /**
     * helper function to create a button with text or an image
     * @param {string} text
     * @param {string} icon
     * @returns {HTMLElement} 
     */
    static createButton(text = "", icon = "") {
        const button = document.createElement("button");
        if (icon) {
            button.appendChild(element.imgElement(icon, "icon", ""));
        } else {
            button.textContent = text;
        }
        return button;
    };
    static createFootRecent(data){
        const footContainer = element.divELement("foot-for-recent-order");
        const buttonContainer = element.divELement("foot-recent-button-container");
        const spanTitle = element.spanElement("","Showing 1-10 from 100");
        const buttonPre = this.createButton("",ic_chevron);
        const fragment = document.createDocumentFragment();
        for (let i = 1 ; i <=5 ; i++){
            const button = this.createButton(`${i}`);
            if (i === 1){
                button.className = "button-active";
            }
            fragment.append(button);
        }
        const buttonCtn = this.createButton("...");
        const buttonNext = this.createButton("",ic_chevron);

        buttonContainer.append(buttonPre,fragment,buttonCtn,buttonNext);
        footContainer.appendChild(spanTitle);
        footContainer.appendChild(buttonContainer);

        return footContainer;
    }
    static createTableMain(data){

    }
}