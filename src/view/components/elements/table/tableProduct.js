import { ic_chevron_down, ic_avatar_gray, ic_eye, ic_pen, ic_trash, icon_success } from "@/constants";
import { elementHtml } from "@/utils";
import { CategoryController, productController } from "@/controllers";
import { Link } from "../link";
import { Toast } from "../toast/toast";

const element = new elementHtml();
export class TableProduct{
    constructor(){
        this.table = document.createElement("table");
        this.table.className = "table-product";
        this.createThead();
        this.createTbody();
    }
    createThead(){
        const thead = document.createElement("thead");
        const headrow = document.createElement("tr");
        const title = [
            {title: "Product", icon: ic_chevron_down},
            {title: "SKU"},
            {title: "Category"},
            {title: "Stock", icon: ic_chevron_down},
            {title: "Price", icon: ic_chevron_down},
            {title: "Status", icon: ic_chevron_down},
            {title: "Added", icon: ic_chevron_down},
            {title: "Action"},
        ];
        title.forEach((obj , index)=> {
            const th = document.createElement("th");
            if (index === 0){
                const div = element.divELement("");
                const input = document.createElement("input");
                input.type = "checkbox";
                const span = element.spanElement("",obj.title);
                const img = element.imgElement(ic_chevron_down,"icon","");
                div.append(input, span, img);
                th.appendChild(div);
                headrow.appendChild(th);
                return;
            }
            th.appendChild(element.spanElement("",obj.title));
            if (obj.icon){
                const img = element.imgElement(ic_chevron_down, "icon", "");
                th.appendChild(img);
                headrow.appendChild(th);
                return;
            }
            headrow.appendChild(th);
        });
        thead.appendChild(headrow);
        this.table.appendChild(thead);
    }
    async createTbody() {
        const tbody = document.createElement("tbody");
        const products = await productController.getListProduct(1);
        
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
                        Toast.toastShow("toast-success",icon_success,"DELETE SUCCESS","Success delete product");
                    }
                }
                await productController.deleteProduct(Product.id);
            });
            
            td.append(detail, update, deletee);
            bodyrow.appendChild(td);
            tbody.appendChild(bodyrow);
        }
        
        this.table.appendChild(tbody);
    }
    
    render(){
        return this.table;
    }
}