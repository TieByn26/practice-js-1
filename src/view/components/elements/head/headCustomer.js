import { elementHtml } from "@/utils";
import { routesPath } from "@/constants";
import { Breadcrumb } from "../breadcrumb";
import { button } from "../button";
import { ic_export, ic_plus , ic_filter, ic_search} from "@/constants";
import { CustomerController } from "@/controllers";
import { Link } from "../link";
import { Toast } from "../toast/toast";
import { ic_eye, ic_pen, ic_trash, ic_avatar_cus } from "@/constants";

const element = new elementHtml();
export class HeadCustomer{
    constructor(){
        this.container = element.divELement("customer-head-container");
        this.initHeadTop();
        this.initHeadBottom();
    }
    initHeadTop(){
        const headTop = element.divELement("customer-head-container_top");
        const breadcrumb = new Breadcrumb([routesPath.home, routesPath.customer],"Customer").render();

        const buttonContainer = element.divELement("customer-head-container_top-button");
        buttonContainer.append(
            new button().render("button-middle",{to:"/404",label:"Export",icon:ic_export}),
            new button().render("button-blue",{to:"/404",label:"Add Customer",icon:ic_plus})
        );
        headTop.append(breadcrumb, buttonContainer);
        this.container.appendChild(headTop);

    }
    async initHeadBottom(){
        const headBottom = element.divELement("customer-head-container_bottom");
        const search = element.divELement("customer-head-container_bottom-search");
        const img = element.imgElement(ic_search,"icon","");
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Search customer. . .";
        search.append(img, input);
        headBottom.append(search, 
            new button().render("button-white",{to:"/404",label:"Filter",icon:ic_filter})
        );
        this.container.appendChild(headBottom);

        const customers = await CustomerController.getAllCustomer();
        const debounce = (func, delay ) =>{
            let timeout;
            return function(...args){
                clearTimeout(timeout);
                timeout = setTimeout( async () => func.apply(this, args), delay);
            };
        }
        const searchByName = async () => {  
            const searchValue = input.value.trim();
            const filteredData = customers.filter(customer => customer.name.startsWith(searchValue));

            const productContainer = document.querySelector(".customer-container");
            const tbodyOld = productContainer.querySelector("tbody");
            if (filteredData.length > 0) {
                    const fragment = await this.createTableMain(filteredData);
                    tbodyOld.replaceChildren(...fragment.childNodes);
            } 
            if (input.value === ""){
                const fragment = await this.createTableMain(customers);
                tbodyOld.replaceChildren(...fragment.childNodes);
            }
        }

        input.addEventListener("input",debounce(searchByName, 300));
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
                        Toast.toastShow("toast-success",icon_success,"DELETE SUCCESS","Success delete customer");
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