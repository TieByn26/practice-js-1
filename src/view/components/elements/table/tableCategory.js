import { elementHtml } from "@/utils";
import { ic_avatar_gray, ic_chevron_down, ic_eye, ic_trash, ic_pen, icon_success, icon_error } from "@/constants";
import { CategoryController } from "@/controllers";
import { Link } from "../link";
import { Toast } from "../toast/toast";

const element = new elementHtml();
export class TableCategory {
    constructor() {
        this.table = document.createElement("table");
        this.table.className = "table-category";
        this.initThead();
        this.initTable();
    }
    initThead() {
        const thead = document.createElement("thead");
        const headrow = document.createElement("tr");
        const title = [
            { title: "Category", icon: ic_chevron_down },
            { title: "Sales", icon: ic_chevron_down },
            { title: "Stock", icon: ic_chevron_down },
            { title: "Added", icon: ic_chevron_down },
            { title: "Action" }
        ];
        title.forEach((obj, index) => {
            const th = document.createElement("th");
            if (index === 0) {
                const div = element.divELement("");
                const input = document.createElement("input");
                input.type = "checkbox";
                const span = element.spanElement("", obj.title);
                const img = element.imgElement(ic_chevron_down, "icon", "");
                div.append(input, span, img);
                th.appendChild(div);
                headrow.appendChild(th);
                return;
            }
            th.appendChild(element.spanElement("", obj.title));
            if (obj.icon) {
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
    async initTable() {
        const tbody = document.createElement("tbody");
        const categories = await CategoryController.getListCategory(1);
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
                        Toast.toastShow("toast-success",icon_success,"DELETE SUCCESS","Success delete category");
                    }
                }
                await CategoryController.deteteCategory(Category.id);
            });
            td.append(detail, update, deletee);
            tr.appendChild(td);  
            tbody.appendChild(tr);
        });
        this.table.appendChild(tbody);
    }
    render() {
        return this.table;
    }
}