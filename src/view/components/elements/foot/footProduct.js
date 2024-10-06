import { elementHtml } from "@/utils";
import { ic_chevron ,ic_avatar_gray, ic_eye, ic_pen, ic_trash, icon_error} from "@/constants";
import { productController, CategoryController } from "@/controllers";
import { Link } from "../link";
import { Toast } from "../toast/toast";

const element = new elementHtml();
export class FootProduct{
    constructor(){
        this.container = element.divELement("product-container-foot");
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
        const buttonContainer = element.divELement("product-container-foot_button");
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
                const table = document.querySelector(".table-product");

                const data = await productController.getListProduct(numberPage);
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
                const table = document.querySelector(".table-product");
        
                const data = await productController.getListProduct(numberPage);
                const fragment = await this.createTableMain(data);
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
                const table = document.querySelector(".table-product");
        
                const data = await productController.getListProduct(numberPage);
                const fragment = await this.createTableMain(data);
                const tbodyOld = table.querySelector("tbody");
                tbodyOld.replaceChildren(fragment);
            }
        });
        this.container.append(spanTitle, buttonContainer);
    }
    async createTableMain(product){
        const tbody = document.createElement("tbody");
        const products = product;
        
        for (const Product of products) {
            const bodyrow = document.createElement("tr");
            const keys = ["name", "sku", "categoryId", "quantity", "price", "status", "added"];
            let checkToDelete = null;
            
            for (const key of keys) {
                const td = document.createElement("td");
                if (key === "name") {
                    const div = element.divELement("div-name");
                    const input = document.createElement("input");
                    input.type = "checkbox";
                    const img = element.imgElement(ic_avatar_gray, "icon", "");
                    const divContent = element.divELement("");
                    const spanName = element.spanElement("", Product[key]);
                    const spanVariant = element.spanElement("", Product["variant"]);
                    
                    divContent.append(spanName, spanVariant);
                    div.append(input, img, divContent);
                    td.appendChild(div);
                    bodyrow.appendChild(td);
                    checkToDelete = td;
                    continue;
                }
                if (key === "categoryId") {
                    const category = await CategoryController.getCategoryFollowId(Product.categoryId);
                    const span = element.spanElement("", category.name);
                    td.appendChild(span);
                    bodyrow.appendChild(td);
                    continue;
                }
                if (key === "status") {
                    const status = Product[key].startsWith("O") ? "out-stock-status" :
                        Product[key].startsWith("L") ? "low-stock-status" :
                        Product[key].startsWith("D") ? "draft-status" : "published-status";
                        
                    const span = element.spanElement(status, Product[key]);
                    td.appendChild(span);
                    bodyrow.appendChild(td);
                    continue;
                }
                const span = element.spanElement("", Product[key]);
                td.appendChild(span);
                bodyrow.appendChild(td);
            }
            
            const td = document.createElement("td");
            const detail = new Link(`/product-detail/${Product.id}`).render();
            detail.appendChild(element.imgElement(ic_eye, "icon", ""));
            const update = new Link(`/404`).render();
            update.appendChild(element.imgElement(ic_pen, "icon", ""));
            const deletee = element.imgElement(ic_trash, "icon", "delete-icon");
            
            deletee.addEventListener('click', async () => {
                if (checkToDelete) {
                    const tr = checkToDelete.closest('tr');
                    if (tr) {
                        tr.remove();
                        Toast.toastShow("toast-error",icon_error,"DELETE SUCCESS","Success delete product");
                    }
                }
                await productController.deleteProduct(Product.id);
            });
            
            td.append(detail, update, deletee);
            bodyrow.appendChild(td);
            tbody.appendChild(bodyrow);
        }

        return tbody;
    }
    render(){
        return this.container;
    }
}
