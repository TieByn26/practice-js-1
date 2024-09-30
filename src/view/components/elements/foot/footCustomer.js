import { elementHtml } from "@/utils";
import { ic_chevron, ic_avatar_cus, ic_eye, ic_pen, ic_trash } from "@/constants";
import { CustomerController } from "@/controllers";
import { Link } from "../link";

const element = new elementHtml();
export class FootCustomer{
    constructor(){
        this.container = element.divELement("customer-container-foot");
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
                const table = document.querySelector(".table-customer");

                const data = await CustomerController.getListCustomer(numberPage);
                const fragment = await this.createTableMain(data);
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
                const table = document.querySelector(".table-customer");
        
                const data = await CustomerController.getListCustomer(numberPage);
                const fragment = await this.createTableMain(data);
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
                const table = document.querySelector(".table-customer");
        
                const data = await CustomerController.getListCustomer(numberPage);
                const fragment = await this.createTableMain(data);
                const tbodyOld = table.querySelector("tbody");
                tbodyOld.replaceChildren(fragment);
            }
        });
        this.container.append(spanTitle, buttonContainer);
    }
    async createTableMain(customer) {
        const tbody = document.createElement("tbody");
        const customers = customer;
        customers.forEach(customer => {
            const bodyrow = document.createElement("tr");
            const keys = ["name","phone","orders","balance","status","created"];
            let checkToDelete = null;
            keys.forEach(key => {
                const td = document.createElement("td");
                if (key === "name"){
                    const div = element.divELement("div-name");
                    const input = document.createElement("input");
                    input.type = "checkbox";
                    const img = element.imgElement(ic_avatar_cus,"icon","");
                    const divContent = element.divELement("");
                    const spanName = element.spanElement("",customer[key]);
                    const spanMail = element.spanElement("",customer["mail"]);

                    divContent.append(spanName, spanMail);
                    div.append(input, img, divContent);
                    td.appendChild(div);
                    bodyrow.appendChild(td);
                    checkToDelete = td;
                    return;
                }
                if (key === "status") {
                    const status = customer[key].startsWith("A") ? `active-status`: `blocked-status`;
                    const span = element.spanElement(status,customer[key]);
                    td.appendChild(span)
                    bodyrow.appendChild(td);
                    return;
                }
                const span = element.spanElement("",customer[key])
                td.appendChild(span);
                bodyrow.appendChild(td);
            });
            const td = document.createElement("td");
            const detail = new Link(`/customer-detail/${customer.id}`).render();
            detail.appendChild(element.imgElement(ic_eye,"icon",""));
            const update = new Link (`/404`).render();
            update.appendChild(element.imgElement(ic_pen,"icon",""));
            const deletee = element.imgElement(ic_trash,"icon","");
            deletee.addEventListener('click', async () => {
                if (checkToDelete) {
                    const tr = checkToDelete.closest('tr');
                    if (tr) {
                        tr.remove();
                    }
                }
                await CustomerController.deleteCustomer(customer.id);
            });
            td.append(detail, update, deletee);
            bodyrow.appendChild(td);
            tbody.appendChild(bodyrow);
        });
        return tbody;
    }
    render(){
        return this.container;
    }
}