import { elementHtml } from "@/utils";
import { ic_chevron, ic_avatar_gray, ic_eye, ic_pen, ic_trash } from "@/constants";
import { CategoryController } from "@/controllers";
import { Link } from "../link";

const element = new elementHtml();
export class FootCategory{
    constructor(){
        this.container = element.divELement("category-container-foot");
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
        const buttonContainer = element.divELement("category-container-foot_button");
        const spanTitle = element.spanElement("", "Showing 1-10 from 15");
        const buttonPre = this.createButton("", ic_chevron);
        const fragment = document.createDocumentFragment();
    
        const buttons = [];
        for (let i = 1; i <= 2; i++) {
            const button = this.createButton(`${i}`);
            if (i === 1) {
                button.className = "button-active";
            }
            buttons.push(button);
            fragment.append(button);
        }
        const buttonNext = this.createButton("", ic_chevron);
    
        buttonContainer.append(buttonPre, fragment, buttonNext);
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
                const table = document.querySelector(".table-category");

                const data = await CategoryController.getListCategory(numberPage);
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
                const table = document.querySelector(".table-category");
        
                const data = await CategoryController.getListCategory(numberPage);
                const fragment = await this.createTableMain(data);
                const tbodyOld = table.querySelector("tbody");
                tbodyOld.replaceChildren(fragment);
            }
        });
        
        buttonNext.addEventListener('click', async () => {
            const presentButton = buttons.find(btn => btn.classList.contains("button-active")); 
            const check = parseInt(presentButton.textContent);
            if (check < 2) {
                buttons.forEach(btn => btn.classList.remove("button-active"));
                const numberPage = check + 1;
                buttons[numberPage - 1].className = "button-active";
                const table = document.querySelector(".table-category");
        
                const data = await CategoryController.getListCategory(numberPage);
                const fragment = await this.createTableMain(data);
                const tbodyOld = table.querySelector("tbody");
                tbodyOld.replaceChildren(fragment);
            }
        });
        this.container.append(spanTitle, buttonContainer);
    }
    async createTableMain(category) {
        const tbody = document.createElement("tbody");
        const categories = category
        categories.forEach(Category => {
            const keys = ["name", "sales", "stock", "added"];
            const tr = document.createElement("tr");
            let checkToDelete = null;
            keys.forEach((key, index) => {
                const td = document.createElement("td");
                if (key === "name") {
                    const input = document.createElement("input");
                    input.type = "checkbox";
                    const img = element.imgElement(ic_avatar_gray, "icon", "");
                    const div = element.divELement("div-span");
                    const spanName = element.spanElement("", Category[key]);
                    const spanDes = element.spanElement("", Category["description"]);
                    div.append(spanName, spanDes);
                    td.append(input, img, div);
                    tr.appendChild(td);
                    checkToDelete = td;
                    return;
                }
                const span = element.spanElement("", Category[key]);
                td.appendChild(span);
                tr.appendChild(td);
            });
            const td = document.createElement("td");
            const detail = new Link(`/category-detail/${Category.id}`).render();
            detail.appendChild(element.imgElement(ic_eye, "icon", ""));
            const update = new Link(`/category-detail/${Category.id}`).render();
            update.appendChild(element.imgElement(ic_pen, "icon", ""));
            const deletee = element.imgElement(ic_trash, "icon", "delete-icon");
            deletee.addEventListener('click', async () => {
                if (checkToDelete) {
                    const tr = checkToDelete.closest('tr');
                    if (tr) {
                        tr.remove();
                    }
                }
                await CategoryController.deteteCategory(Category.id);
            });
            td.append(detail, update, deletee);
            tr.appendChild(td);  
            tbody.appendChild(tr);
        });
        return tbody;
    }
    render(){
        return this.container;
    }
}
