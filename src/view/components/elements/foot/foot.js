import { elementHtml } from "@/utils"
import { ic_chevron } from "@/constants";
const elHtml = new elementHtml();

export const footSelling = () => {
    const container1 = elHtml.divELement("top-container_left-footer");
    const span = elHtml.spanElement("", "Showing 1-5 from 15");

    const container2 = elHtml.divELement("");
    
    const buttonPre = document.createElement("button");
    buttonPre.appendChild(elHtml.imgElement(ic_chevron, "icon", ""));

    const button1 = document.createElement("button");
    button1.textContent = "1";
    
    const button2 = document.createElement("button");
    button2.textContent = "2";
    
    const button3 = document.createElement("button");
    button3.textContent = "3";
    
    const buttonNext = document.createElement("button");
    buttonNext.appendChild(elHtml.imgElement(ic_chevron, "icon", ""));

    container2.appendChild(buttonPre);
    container2.appendChild(button1);
    container2.appendChild(button2);
    container2.appendChild(button3);
    container2.appendChild(buttonNext);

    container1.appendChild(span);
    container1.appendChild(container2);

    return container1.outerHTML;
}
