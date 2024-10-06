import { elementHtml } from "@/utils";
import { button } from "../button";
import { ic_search, ic_filter, ic_plus, ic_export,ic_calendar, routesPath, icon_success } from "@/constants";
import { Breadcrumb } from "../breadcrumb";
import { productController } from "@/controllers";
import { Link } from "../link";
import { CategoryController } from "@/controllers";
import { ic_eye, ic_pen, ic_trash, ic_avatar_gray } from "@/constants";
import { Toast } from "../toast/toast";

const element = new elementHtml();
export class HeadProduct{
    constructor(){
        this.container = element.divELement("product-head-container");
        this.initHeadTop();
        this.initHeadBottom();
    }
    initHeadTop(){
        const headTop = element.divELement("product-head-container_top");
        const breadcrumb = new Breadcrumb([routesPath.home, routesPath.product],"Product").render();

        const buttonContainer = element.divELement("product-head-container_top-button");
        buttonContainer.append(
            new button().render("button-middle",{to:"/404",label:"Export",icon:ic_export}),
            new button().render("button-blue",{to:"/add-product",label:"Add Product",icon:ic_plus})
        );
        headTop.append(breadcrumb, buttonContainer);
        this.container.appendChild(headTop);

    }
    async initHeadBottom(){
        const headBottom = element.divELement("product-head-container_bottom");
        const search = element.divELement("product-head-container_bottom-search");
        const img = element.imgElement(ic_search,"icon","");
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Search product. . .";
        search.append(img, input);
        const buttonContainer = element.divELement("button-container");
        buttonContainer.append(
            new button().render("button-white",{to:"/404",label:"Select Dates",icon:ic_calendar}), 
            new button().render("button-white",{to:"/404",label:"Filters",icon:ic_filter}));
        headBottom.append(search, buttonContainer);
        this.container.appendChild(headBottom);

        //set event for search
        const products = await productController.getAllProduct();
        const debounce = (func, delay ) =>{
            let timeout;
            return function(...args){
                clearTimeout(timeout);
                timeout = setTimeout( async () => func.apply(this, args), delay);
            };
        }
        const searchByName = async () => {
            const searchValue = input.value.trim();
            const filteredData = products.filter(product => product.name.startsWith(searchValue));

            const productContainer = document.querySelector(".product-container");
            const tbodyOld = productContainer.querySelector("tbody");
            if (filteredData.length > 0) {
                    const fragment = await this.createTableMain(filteredData);
                    tbodyOld.replaceChildren(...fragment.childNodes);
            } 
            if (input.value === ""){
                const fragment = await this.createTableMain(products);
                tbodyOld.replaceChildren(...fragment.childNodes);
            }
        }

        input.addEventListener("input",debounce(searchByName, 300));
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
                        Toast.toastShow("toast-success",icon_success,"DELETE SUCCESS","Success delete product");
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