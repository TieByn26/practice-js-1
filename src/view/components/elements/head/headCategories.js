import { elementHtml } from "@/utils";
import { Breadcrumb } from "../breadcrumb";
import { routesPath } from "@/constants";
import { button } from "../button";
import { ic_export, ic_plus,  ic_filter, ic_search } from "@/constants";
import { CategoryController } from "@/controllers";
import { Toast } from "../toast/toast";
import { Link } from "../link";
import { ic_eye, ic_pen, ic_trash, icon_success,ic_avatar_gray } from "@/constants";

const element = new elementHtml();
export class HeadCategories{
    constructor(categories){
        this.container = element.divELement("category-head-container");
        this.initHeadTop();
        this.initHeadBottom(categories);
    }
    initHeadTop(){
        const headTop = element.divELement("category-head-container_top");
        const breadcrumb = new Breadcrumb([routesPath.home, routesPath.categories],"Categories").render();

        const buttonContainer = element.divELement("category-head-container_top-button");
        buttonContainer.append(
            new button().render("button-middle",{to:"/404",label:"Export",icon:ic_export}),
            new button().render("button-blue",{to:"/add-category",label:"Add Category",icon:ic_plus})
        );
        headTop.append(breadcrumb, buttonContainer);
        this.container.appendChild(headTop);

    }
    initHeadBottom(categories){
        const headBottom = element.divELement("category-head-container_bottom");
        const search = element.divELement("category-head-container_bottom-search");
        const img = element.imgElement(ic_search,"icon","");
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Search category. . .";
        search.append(img, input);
        headBottom.append(search, 
            new button().render("button-white",{to:"/404",label:"Filter",icon:ic_filter})
        );
        this.container.appendChild(headBottom);
        const debounce = (func, delay ) =>{
            let timeout;
            return function(...args){
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), delay);
            };
        }
        const searchByName =  () => {  
            const searchValue = input.value.trim();
            const filteredData = categories.filter(category => category.name.startsWith(searchValue));

            const productContainer = document.querySelector(".category-container");
            const tbodyOld = productContainer.querySelector("tbody");
            if (filteredData.length > 0) {
                    const fragment = this.createTableMain(filteredData);
                    tbodyOld.replaceChildren(...fragment.childNodes);
            } 
            if (input.value === ""){
                const fragment = this.createTableMain(categories.slice(0,10));
                tbodyOld.replaceChildren(...fragment.childNodes);
            }
        }

        input.addEventListener("input",debounce(searchByName, 300));
    } 
    createTableMain(category) {
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
                        Toast.toastShow("toast-success",icon_success,"DELETE SUCCESS","Success delete category");
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
