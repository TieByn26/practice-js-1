import { elementHtml } from "@/utils";
import { ic_chevron_down, ic_avatar_cus, ic_eye, ic_pen, ic_trash, icon_success } from "@/constants";
import { CustomerController } from "@/controllers";
import { Link } from "../link";
import { Toast } from "../toast/toast";
import { Pagination } from "@/utils";

const element = new elementHtml();

export class TableCustomer {
    constructor(customers) {
        this.customers = customers;
        this.pagination = new Pagination(10, customers.length); 
        this.table = document.createElement("table");
        this.table.className = "table-customer";
        this.createThead();
        this.createTbody(this.pagination.getCurrentPageItems(this.customers));
    }

    createThead() {
        const thead = document.createElement("thead");
        const headrow = document.createElement("tr");
        const title = [
            { title: "Customer Name", icon: ic_chevron_down },
            { title: "Phone" },
            { title: "Orders", icon: ic_chevron_down },
            { title: "Balance", icon: ic_chevron_down },
            { title: "Status", icon: ic_chevron_down },
            { title: "Created", icon: ic_chevron_down },
            { title: "Action" },
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

    createTbody(customers) {
        const tbody = document.createElement("tbody");
        customers.forEach(customer => {
            const bodyrow = document.createElement("tr");
            const keys = ["name", "phone", "orders", "balance", "status", "created"];
            let checkToDelete = null;
            keys.forEach(key => {
                const td = document.createElement("td");
                if (key === "name") {
                    const div = element.divELement("div-name");
                    const input = document.createElement("input");
                    input.type = "checkbox";
                    const img = element.imgElement(ic_avatar_cus, "icon", "");
                    const divContent = element.divELement("");
                    const spanName = element.spanElement("", customer[key]);
                    const spanMail = element.spanElement("", customer["mail"]);

                    divContent.append(spanName, spanMail);
                    div.append(input, img, divContent);
                    td.appendChild(div);
                    bodyrow.appendChild(td);
                    checkToDelete = td;
                    return;
                }
                if (key === "status") {
                    const status = customer[key].startsWith("A") ? `active-status` : `blocked-status`;
                    const span = element.spanElement(status, customer[key]);
                    td.appendChild(span);
                    bodyrow.appendChild(td);
                    return;
                }
                const span = element.spanElement("", customer[key]);
                td.appendChild(span);
                bodyrow.appendChild(td);
            });
            const td = document.createElement("td");
            const detail = new Link(`/customer-detail/${customer.id}`).render();
            detail.appendChild(element.imgElement(ic_eye, "icon", ""));
            const update = new Link(`/404`).render();
            update.appendChild(element.imgElement(ic_pen, "icon", ""));
            const deletee = element.imgElement(ic_trash, "icon", "");
            deletee.addEventListener('click', async () => {
                if (checkToDelete) {
                    const tr = checkToDelete.closest('tr');
                    if (tr) {
                        tr.remove();
                        Toast.toastShow("toast-success", icon_success, "DELETE SUCCESS", "Success delete customer");
                    }
                }
                await CustomerController.deleteCustomer(customer.id);
            });
            td.append(detail, update, deletee);
            bodyrow.appendChild(td);
            tbody.appendChild(bodyrow);
        });
        this.table.appendChild(tbody);
    }

    render() {
        return this.table;
    }
}
