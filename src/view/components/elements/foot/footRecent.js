import { elementHtml } from "@/utils";
import { ic_chevron, ic_avatar_gray, ic_eye, ic_pen } from "@/constants";
import { OrderController, CustomerController } from "@/controllers";
import { Link } from "../link";
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
    static createFootRecent(data) {
        const footContainer = element.divELement("foot-for-recent-order");
        const buttonContainer = element.divELement("foot-recent-button-container");
        const spanTitle = element.spanElement("", "Showing 1-10 from 100");
        const buttonPre = this.createButton("", ic_chevron);
        const fragment = document.createDocumentFragment();
    
        const buttons = [];
        for (let i = 1; i <= 5; i++) {
            const button = this.createButton(`${i}`);
            if (i === 1) {
                button.className = "button-active";
            }
            buttons.push(button);
            fragment.append(button);
        }
        const buttonCtn = this.createButton("...");
        const buttonNext = this.createButton("", ic_chevron);
    
        buttonContainer.append(buttonPre, fragment, buttonCtn, buttonNext);
        footContainer.appendChild(spanTitle);
        footContainer.appendChild(buttonContainer);
    
        /**
         * add event for button
         */
        buttons.forEach(button => {
            button.addEventListener('click', async () => {
                buttons.forEach(btn => {
                    btn.classList.remove("button-active");
                });
                button.className = "button-active";
                const numberPage = parseInt(button.textContent);
                console.log(numberPage);
                const table = document.querySelector(".table-for-recent-order");

                const data = await OrderController.getListOrder(numberPage);
                console.log(data);
                const fragment = await this.createTableMain(data);
                console.log(fragment);
                const tbodyOld = table.querySelector("tbody");
                tbodyOld.replaceChildren(fragment);
            });
        });
        buttonPre.addEventListener('click', async () => {
            const presentButton = buttons.find(btn => btn.classList.contains("button-active")); 
            const check = parseInt(presentButton.textContent);
            if (check > 1) {
                buttons.forEach(btn => btn.classList.remove("button-active"));
                const numberPage = check - 1;
                buttons[numberPage - 1].className = "button-active";
                console.log(numberPage);
                const table = document.querySelector(".table-for-recent-order");
        
                const data = await OrderController.getListOrder(numberPage);
                console.log(data);
                const fragment = await this.createTableMain(data);
                console.log(fragment);
                const tbodyOld = table.querySelector("tbody");
                tbodyOld.replaceChildren(fragment);
            }
        });
        
        buttonNext.addEventListener('click', async () => {
            const presentButton = buttons.find(btn => btn.classList.contains("button-active")); 
            const check = parseInt(presentButton.textContent);
            if (check < 5) {
                buttons.forEach(btn => btn.classList.remove("button-active"));
                const numberPage = check + 1;
                buttons[numberPage - 1].className = "button-active";
                console.log(numberPage);
                const table = document.querySelector(".table-for-recent-order");
        
                const data = await OrderController.getListOrder(numberPage);
                console.log(data);
                const fragment = await this.createTableMain(data);
                console.log(fragment);
                const tbodyOld = table.querySelector("tbody");
                tbodyOld.replaceChildren(fragment);
            }
        });
        
        return footContainer;
    }
    
    static async createTableMain(obj) {
        const tbody = document.createElement("tbody");
        const orders = obj;

        for (const order of orders) {
            const mainRow = document.createElement("tr");
            const keys = ["id", "name", "added", "customerId", "total", "payment", "status"];

            for (const key of keys) {
                const td = document.createElement("td");

                if (key === "id") {
                    const div = document.createElement("div");
                    const input = document.createElement("input");
                    input.type = "checkbox";
                    const span = element.spanElement("", "# " + order[key]);
                    div.append(input, span);
                    td.appendChild(div);
                    mainRow.appendChild(td);
                    continue;
                }

                if (key === "name") {
                    const div = document.createElement("div");
                    const img = element.imgElement(ic_avatar_gray, "icon", "");
                    const span = element.spanElement("", order[key]);
                    div.append(img, span);
                    td.appendChild(div);
                    mainRow.appendChild(td);
                    continue;
                }

                if (key === "customerId") {
                    const customer = await CustomerController.getCustomerFollowId(order[key]);
                    const div = document.createElement("div");
                    const spanName = element.spanElement("", customer.name);
                    const spanMail = element.spanElement("", customer.mail);
                    div.append(spanName, spanMail);
                    td.appendChild(div);
                    mainRow.appendChild(td);
                    continue;
                }

                const span = element.spanElement("", order[key]);
                if (key === "status") {
                    const status = order[key].startsWith("P") ? "processing-status" :
                                   order[key].startsWith("S") ? "shipped-status" :
                                   order[key].startsWith("D") ? "delivered-status" : "cancelled-status";
                    span.className = status;
                }

                td.appendChild(span);
                mainRow.appendChild(td);
            }

            const td = document.createElement("td");
            const detailLink = new Link(`/order-detail/${order["id"]}`).render();
            const imgEye = element.imgElement(ic_eye, "icon", "");
            detailLink.appendChild(imgEye);

            const updateLink = new Link(`/order-update/${order["id"]}`).render();
            const imgPen = element.imgElement(ic_pen, "icon", "");
            updateLink.appendChild(imgPen);

            td.append(detailLink, updateLink);
            mainRow.appendChild(td);
            tbody.appendChild(mainRow);
        }

        return tbody;
    }
}