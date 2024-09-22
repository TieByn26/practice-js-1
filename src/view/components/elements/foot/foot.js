import { elementHtml } from "@/utils";
import { ic_chevron } from "@/constants";

const elHtml = new elementHtml();

/**
 * helper function to create a button with text or an image
 * @param {string} text
 * @param {string} icon
 * @returns {HTMLElement} 
 */
const createButton = (text = "", icon = "") => {
    const button = document.createElement("button");
    if (icon) {
        button.appendChild(elHtml.imgElement(icon, "icon", ""));
    } else {
        button.textContent = text;
    }
    return button;
};

export const footSelling = () => {
    const container1 = elHtml.divELement("top-container_left-footer");
    const span = elHtml.spanElement("", "Showing 1-5 from 15");
    
    // create buttons using helper function
    const buttonPre = createButton("", ic_chevron);
    const button1 = createButton("1");
    const button2 = createButton("2");
    const button3 = createButton("3");
    const buttonNext = createButton("", ic_chevron);
    
    const container2 = elHtml.divELement("");
    
    // use documentFragment for better performance
    const fragment = document.createDocumentFragment();
    fragment.append(buttonPre, button1, button2, button3, buttonNext);

    container2.appendChild(fragment);
    
    container1.append(span, container2);

    return container1;
};
