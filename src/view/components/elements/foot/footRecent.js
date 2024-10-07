import { elementHtml } from "@/utils";
import { ic_chevron, ic_avatar_gray, ic_eye, ic_pen } from "@/constants";
import { Link } from "../link";
import { Pagination } from "@/utils";

const element = new elementHtml();

export class FootRecent {
    constructor(orders, customers) {
        this.orders = orders;
        this.customers = customers;
        this.pagination = new Pagination(10, orders.length);
        this.container = element.divELement("foot-for-recent-order");
        this.initFoot();
    }

    createButton(text = "", icon = "") {
        const button = document.createElement("button");
        if (icon) button.appendChild(element.imgElement(icon, "icon", ""));
        else button.textContent = text;
        return button;
    }

    initFoot() {
        const buttonContainer = element.divELement("foot-recent-button-container");
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
        const end = Math.min(this.pagination.currentPage * this.pagination.itemOfPage, this.orders.length);
        return `Showing ${start}-${end} from ${this.orders.length}`;
    }

    updateActivePage(buttons, page) {
        this.pagination.currentPage = page;
        buttons.forEach(btn => btn.classList.remove("button-active"));
        buttons[page - 1].classList.add("button-active");

        const spanTitle = this.container.querySelector("span");
        spanTitle.textContent = this.getDisplayText();

        const table = document.querySelector(".table-for-recent-order");
        table.querySelector("tbody").replaceChildren(this.createTableMain(this.pagination.getCurrentPageItems(this.orders)));
    }

    createTableMain(orderPageData) {
        const tbody = document.createElement("tbody");

        orderPageData.forEach(order => {
            const tr = document.createElement("tr");
            const keys = ["id", "name", "added", "customerId", "total", "payment", "status"];

            keys.forEach(key => {
                const td = document.createElement("td");

                if (key === "id") {
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    const div = element.divELement("div-span");
                    div.append(element.spanElement("", `# ${order[key]}`));
                    td.append(checkbox, div);
                } else if (key === "name") {
                    const div = document.createElement("div");
                    const img = element.imgElement(ic_avatar_gray, "icon", "");
                    const span = element.spanElement("", order[key]);
                    div.append(img, span);
                    td.appendChild(div);
                } else if (key === "customerId") {
                    const customer = this.customers.find(c => c.id === order[key]);
                    if (customer) {
                        const div = document.createElement("div");
                        div.append(
                            element.spanElement("", customer.name),
                            element.spanElement("", customer.email)
                        );
                        td.appendChild(div);
                    }
                } else {
                    const span = element.spanElement("", order[key]);
                    if (key === "status") {
                        const statusClass = order[key].startsWith("P") ? "processing-status" :
                                           order[key].startsWith("S") ? "shipped-status" :
                                           order[key].startsWith("D") ? "delivered-status" : "cancelled-status";
                        span.className = statusClass;
                    }
                    td.appendChild(span);
                }
                tr.appendChild(td);
            });

            const td = document.createElement("td");
            td.append(
                this.createLinkIcon(`/order-detail/${order.id}`, ic_eye),
                this.createLinkIcon(`/order-update/${order.id}`, ic_pen)
            );
            tr.appendChild(td);
            tbody.appendChild(tr);
        });

        return tbody;
    }

    createLinkIcon(url, icon) {
        const link = new Link(url).render();
        link.appendChild(element.imgElement(icon, "icon", ""));
        return link;
    }

    render() {
        return this.container;
    }
}
