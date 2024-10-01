import { elementHtml } from "@/utils";
import { ic_chevron ,ic_avatar_gray} from "@/constants";
import { OrderController } from "@/controllers";
import { router } from "@/routes";

const element = new elementHtml();
export class FootCustomerDetail{
    constructor(){
        this.container = element.divELement("customer-detail-container_foot");
        this.initFoot();
    }
    createButton(text = "", icon = "") {
        const button = document.createElement("button");
        if (icon) {
            button.appendChild(element.imgElement(icon, "icon", ""));
        } else {
            button.textContent = text;  
        }
        return button;
    };
    initFoot(){
        const buttonContainer = element.divELement("customer-container-foot_button");
        const spanTitle = element.spanElement("", "Showing 1-5 from 1,296");
        const buttonPre = this.createButton("", ic_chevron);
        const fragment = document.createDocumentFragment();
    
        const buttons = [];
        for (let i = 1; i <= 3; i++) {
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
                const table = document.querySelector(".main-customer-detail_table");

                const data = await OrderController.getOrderFollowIdCus(router.getParam().customerId,numberPage);
                const fragment = this.createTableMain(data);
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
                const table = document.querySelector(".main-customer-detail_table");
        
                const data = await OrderController.getOrderFollowIdCus(router.getParam().customerId,numberPage);
                const fragment =  this.createTableMain(data);
                const tbodyOld = table.querySelector("tbody");
                tbodyOld.replaceChildren(fragment);
            }
        });
        
        buttonNext.addEventListener('click', async () => {
            const presentButton = buttons.find(btn => btn.classList.contains("button-active")); 
            const check = parseInt(presentButton.textContent);
            if (check < 3) {
                buttons.forEach(btn => btn.classList.remove("button-active"));
                const numberPage = check + 1;
                buttons[numberPage - 1].className = "button-active";
                const table = document.querySelector(".main-customer-detail_table");
        
                const data = await OrderController.getOrderFollowIdCus(router.getParam().customerId,numberPage);
                const fragment = this.createTableMain(data);
                const tbodyOld = table.querySelector("tbody");
                tbodyOld.replaceChildren(fragment);
            }
        });
        this.container.append(spanTitle, buttonContainer);
    }
    createTableMain(orders){
        const tbody = document.createElement("tbody");
        orders.forEach(order => {
            const tr = document.createElement("tr");
            const keys = ["id","name","total","status","added"];
            keys.forEach(key => {
                const td = document.createElement("td");

                if (key === "id") {
                    const span = element.spanElement("", "#" + order[key]);
                    td.appendChild(span);
                    tr.appendChild(td);
                    return;
                }

                if (key === "name") {
                    const div = document.createElement("div");
                    const img = element.imgElement(ic_avatar_gray, "icon", "");
                    const span = element.spanElement("", order[key]);
                    div.append(img, span);
                    td.appendChild(div);
                    tr.appendChild(td);
                    return;
                }
                const span = element.spanElement("", order[key]);
                if (key === "status") {
                    const status = order[key].startsWith("P") ? "processing-status" :
                                   order[key].startsWith("S") ? "shipped-status" :
                                   order[key].startsWith("D") ? "delivered-status" : "cancelled-status";
                    span.className = status;
                }

                td.appendChild(span);
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        return tbody;
    }
    render(){
        return this.container;
    }
}
