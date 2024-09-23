import { elementHtml } from "@/utils";
import { ic_chevron } from "@/constants";
import { productController } from "@/controllers";
import { ic_avatar_gray } from "@/constants";

const elHtml = new elementHtml();
export class footSelling {
    constructor() {

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
            button.appendChild(elHtml.imgElement(icon, "icon", ""));
        } else {
            button.textContent = text;
        }
        return button;
    };
    /**
     * Create foot of table and add event for button
     * @returns {HTMLElement}
     */
    static creatFootSelling() {
        const container1 = elHtml.divELement("top-container_left-footer");
        const span = elHtml.spanElement("", "Showing 1-5 from 15");

        // create buttons using helper function
        const buttonPre = this.createButton("",ic_chevron);
        buttonPre.className = "button-pre";
        const button1 = this.createButton("1");
        button1.className = "button-active";
        const button2 = this.createButton("2");
        const button3 = this.createButton("3");
        const buttonNext = this.createButton("",ic_chevron);
        buttonNext.className = "button-next";

        const container2 = elHtml.divELement("top-container_left-footer--button");

        // use documentFragment for better performance
        const fragment = document.createDocumentFragment();
        fragment.append(buttonPre, button1, button2, button3, buttonNext);

        container2.appendChild(fragment);
        container1.append(span, container2);

        const table = document.querySelector(".table-for-selling");
        const buttons = container2.querySelectorAll("button");
        //add event for all button
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const check = button.textContent;
                
                if (Number.isInteger(parseInt(check))) {
                    buttons.forEach(button => {
                        button.classList.remove("button-active");
                    });
                    button.className = "button-active";
                    const numberPage = parseInt(check);
                    productController.getTopSelling(numberPage).then(data => {
                        const fragment = this.createTableMain(data);
                        const table = document.querySelector(".table-for-selling");
                        const tbodyOld = table.querySelector("tbody");
                        tbodyOld.replaceChildren(fragment);
                    });
                    
                }
                
                if (button.classList.contains("button-pre")) {

                    const buttonPresent = container2.querySelector(".button-active");
                    const numberPage = parseInt(buttonPresent.textContent);
                    if (numberPage > 1) {
                        buttons.forEach(button => {
                            button.classList.remove("button-active");
                        });
                        
                        buttons[numberPage - 1].className = "button-active";
                        productController.getTopSelling(numberPage - 1).then(data => {
                            const fragment = this.createTableMain(data);
                            const table = document.querySelector(".table-for-selling");
                            const tbodyOld = table.querySelector("tbody");
                            tbodyOld.replaceChildren(fragment);
                        });
                    }
                }
        
                if (button.classList.contains("button-next")) {

                    const buttonPresent = container2.querySelector(".button-active");
                    const numberPage = parseInt(buttonPresent.textContent);
                    console.log(numberPage);
        
                    if (numberPage < 3) {
                        buttons.forEach(button => {
                            button.classList.remove("button-active");
                        });
        
                        buttons[numberPage + 1].className = "button-active";
                        productController.getTopSelling(numberPage + 1).then(data => {
                            const fragment = this.createTableMain(data);
                            const table = document.querySelector(".table-for-selling");
                            const tbodyOld = table.querySelector("tbody");
                            tbodyOld.replaceChildren(fragment);
                        });
                    }
                }
            });
        });
        
        return container1;
    }
    /**
     * 
     * @param {data} obj 
     * @returns 
     */
    static createTableMain(obj) {
        const fragment = document.createDocumentFragment();
        const listTopSelling = obj;

        listTopSelling.forEach(obj => {
            const mainRow = document.createElement("tr");
            const keys = ["sku", "name", "sales", "amount", "price", "status"];

            keys.forEach((key, index) => {
                if (key === "name") return;

                if (key === "sku") {
                    const td = document.createElement("td");
                    const div = document.createElement("div");
                    const img = elHtml.imgElement(ic_avatar_gray, "icon", "");
                    const spanName = elHtml.spanElement("", obj[keys[1]]);
                    const spanSku = elHtml.spanElement("", "SKU: " + obj[key]);
                    div.append(spanName, spanSku);
                    td.append(img, div);
                    mainRow.appendChild(td);
                    return;
                }

                if (key === "status") {
                    const status = obj[key].startsWith("O") ? "out-stock-status" :
                        obj[key].startsWith("L") ? "low-stock-status" :
                            obj[key].startsWith("D") ? "draft-status" : "published-status";
                    const span = elHtml.spanElement(status, obj[key]);
                    const td = document.createElement("td");
                    td.appendChild(span);
                    mainRow.appendChild(td);

                    return;
                }

                const td = document.createElement("td");
                td.appendChild(elHtml.spanElement("", obj[key]));
                mainRow.appendChild(td);
            });
            fragment.appendChild(mainRow);
        });
        return fragment;
    }
}
