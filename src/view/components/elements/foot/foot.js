import { elementHtml } from "@/utils";
import { ic_chevron, ic_avatar_gray } from "@/constants";
import { Pagination } from "@/utils";

const element = new elementHtml();

export class footSelling {
    constructor(topSelling) {
        this.topSelling = topSelling;
        this.pagination = new Pagination(5, topSelling.length); 
        this.container = element.divELement("top-container_left-footer");
        this.initFoot();
    }

    createButton(text = "", icon = "") {
        const button = document.createElement("button");
        if (icon) button.appendChild(element.imgElement(icon, "icon", ""));
        else button.textContent = text;
        return button;
    }

    initFoot() {
        const buttonContainer = element.divELement("top-container_left-footer--button");
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
        for (let i = 0; i < this.pagination.totalPage; i++) {
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
        const end = Math.min(this.pagination.currentPage * this.pagination.itemOfPage, this.topSelling.length);
        return `Showing ${start}-${end} from ${this.topSelling.length}`;
    }

    updateActivePage(buttons, page) {
        this.pagination.currentPage = page;
        buttons.forEach(btn => btn.classList.remove("button-active"));
        buttons[page - 1].classList.add("button-active");

        const spanTitle = this.container.querySelector("span");
        spanTitle.textContent = this.getDisplayText();

        const table = document.querySelector(".table-for-selling");
        table.querySelector("tbody").replaceChildren(this.createTableMain(this.pagination.getCurrentPageItems(this.topSelling)));
    }

    createTableMain(obj) {
        const tbody = document.createElement("tbody");

        obj.forEach(item => {
            const mainRow = document.createElement("tr");
            const keys = ["sku", "name", "sales", "amount", "price", "status"];

            keys.forEach(key => {
                const td = document.createElement("td");

                if (key === "name"){
                    return;
                }
                if (key === "sku") {
                    const div = document.createElement("div");
                    const img = element.imgElement(ic_avatar_gray, "icon", "");
                    const spanName = element.spanElement("", item["name"]);
                    const spanSku = element.spanElement("", "SKU: " + item["sku"]);
                    div.appendChild(spanName);
                    div.appendChild(spanSku);
                    td.append(img, div);
                    mainRow.appendChild(td);
                } else if (key === "status") {
                    const statusClass = item.status.startsWith("O") ? "out-stock-status" :
                        item.status.startsWith("L") ? "low-stock-status" :
                            item.status.startsWith("D") ? "draft-status" : "published-status";
                    const span = element.spanElement(statusClass, item.status);
                    td.appendChild(span);
                    mainRow.appendChild(td);
                } else {
                    td.appendChild(element.spanElement("", item[key]));
                    mainRow.appendChild(td);
                }
            });

            tbody.appendChild(mainRow);
        });

        return tbody;
    }

    render() {
        return this.container;
    }
}
