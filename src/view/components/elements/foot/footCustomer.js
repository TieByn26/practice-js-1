import { elementHtml } from "@/utils";
import { ic_chevron, ic_avatar_cus, ic_eye, ic_pen, ic_trash, icon_success } from "@/constants";
import { CustomerController } from "@/controllers";
import { Link } from "../link";
import { Toast } from "../toast/toast";
import { Pagination } from "@/utils";

const element = new elementHtml();

export class FootCustomer {
    constructor(customers) {
        this.customers = customers;
        this.pagination = new Pagination(10, customers.length);  // Pagination 10 items per page
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
    }

    initFoot() {
        const buttonContainer = element.divELement("customer-container-foot_button");
        const spanTitle = element.spanElement("", this.getDisplayText());

        const buttonPre = this.createButton("", ic_chevron);  
        const buttonNext = this.createButton("", ic_chevron); 

        const buttons = this.createPageButtons(); 

        buttonContainer.append(buttonPre, ...buttons, buttonNext);
        this.container.append(spanTitle, buttonContainer);

        buttonPre.addEventListener('click', () => this.updateActivePage(buttons, this.pagination.prevPage()));
        buttonNext.addEventListener('click', () => this.updateActivePage(buttons, this.pagination.nextPage()));

        buttons.forEach((btn, i) => {
            btn.addEventListener('click', () => this.updateActivePage(buttons, i + 1));
        });
    }

    createPageButtons() {
        const buttons = [];
        for (let i = 0; i < 6; i++) {
            const btn = this.createButton(`${i + 1}`);
            if (i + 1 === this.pagination.currentPage) {
                btn.className = "button-active";
            }
            buttons.push(btn);
        }
        return buttons;  
    }

    getDisplayText() {
        const start = (this.pagination.currentPage - 1) * this.pagination.itemOfPage + 1;
        const end = Math.min(this.pagination.currentPage * this.pagination.itemOfPage, this.customers.length);
        return `Showing ${start}-${end} from ${this.customers.length}`;
    }

    updateActivePage(buttons, page) {
        this.pagination.currentPage = page;
        buttons.forEach(btn => btn.classList.remove("button-active"));
        buttons[page - 1].classList.add("button-active");

        const spanTitle = this.container.querySelector("span");
        spanTitle.textContent = this.getDisplayText();

        const table = document.querySelector(".table-customer");
        table.querySelector("tbody").replaceChildren(this.createTableMain(this.pagination.getCurrentPageItems(this.customers)));
    }

    createTableMain(customers) {
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
            td.append(
                this.createLinkIcon(`/customer-detail/${customer.id}`, ic_eye),
                this.createLinkIcon(`/customer-detail/${customer.id}`, ic_pen),
                this.createDeleteIcon(customer.id, bodyrow)
            );
            bodyrow.appendChild(td);
            tbody.appendChild(bodyrow);
        });

        return tbody;
    }

    createLinkIcon(url, icon) {
        const link = new Link(url).render();
        link.appendChild(element.imgElement(icon, "icon", ""));
        return link;
    }

    createDeleteIcon(customerId, row) {
        const deleteIcon = element.imgElement(ic_trash, "icon", "delete-icon");
        deleteIcon.addEventListener('click', async () => {
            try {
                await CustomerController.deleteCustomer(customerId);
                row.remove();
                Toast.toastShow("toast-success", icon_success, "DELETE SUCCESS", "Customer deleted successfully");
            } catch (error) {
                Toast.toastShow("toast-error", icon_error, "DELETE FAILED", "Failed to delete customer");
            }
        });
        return deleteIcon;
    }

    render() {
        return this.container;
    }
}
