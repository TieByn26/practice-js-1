import { elementHtml } from "@/utils";
import { ic_chevron, ic_avatar_gray, ic_eye, ic_pen, ic_trash, icon_success, icon_error } from "@/constants";
import { Link } from "../link";
import { Toast } from "../toast/toast";
import { Pagination } from "@/utils";
import { CategoryController } from "@/controllers";

const element = new elementHtml();

export class FootCategory {
    constructor(categories) {
        this.categories = categories;
        this.pagination = new Pagination(10, categories.length);
        this.container = element.divELement("category-container-foot");
        this.initFoot();
    }

    createButton(text = "", icon = "") {
        const button = document.createElement("button");
        if (icon) button.appendChild(element.imgElement(icon, "icon", ""));
        else button.textContent = text;
        return button;
    }

    initFoot() {
        const buttonContainer = element.divELement("category-container-foot_button");
        const spanTitle = element.spanElement("", this.getDisplayText());

        const buttonPre = this.createButton("", ic_chevron);
        const buttonNext = this.createButton("", ic_chevron);
        const buttons = this.createPageButtons();

        buttonContainer.append(buttonPre, ...buttons, buttonNext);
        this.container.append(spanTitle, buttonContainer);

        // event fỏ button
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
        const end = Math.min(this.pagination.currentPage * this.pagination.itemOfPage, this.categories.length);
        return `Showing ${start}-${end} from ${this.categories.length}`;
    }

    updateActivePage(buttons, page) {
        this.pagination.currentPage = page;
        buttons.forEach(btn => btn.classList.remove("button-active"));
        buttons[page - 1].classList.add("button-active");

        const spanTitle = this.container.querySelector("span");
        spanTitle.textContent = this.getDisplayText();

        const table = document.querySelector(".table-category");
        table.querySelector("tbody").replaceChildren(this.createTableMain(this.pagination.getCurrentPageItems(this.categories)));
    }

    createTableMain(categoryPageData) {
        const tbody = document.createElement("tbody");

        categoryPageData.forEach(Category => {
            const tr = document.createElement("tr");
            ["name", "sales", "stock", "added"].forEach(key => {
                const td = document.createElement("td");
                if (key === "name") {
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    const img = element.imgElement(ic_avatar_gray, "icon", "");
                    const div = element.divELement("div-span");
                    div.append(element.spanElement("", Category.name), element.spanElement("", Category.description));
                    td.append(checkbox, img, div);
                } else {
                    td.appendChild(element.spanElement("", Category[key]));
                }
                tr.appendChild(td);
            });

            const td = document.createElement("td");
            td.append(
                this.createLinkIcon(`/category-detail/${Category.id}`, ic_eye),
                this.createLinkIcon(`/category-detail/${Category.id}`, ic_pen),
                this.createDeleteIcon(tr, Category.id)
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

    createDeleteIcon(row, categoryId) {
        const deleteIcon = element.imgElement(ic_trash, "icon", "delete-icon");
        deleteIcon.addEventListener('click', async () => {
            try {
                await CategoryController.deteteCategory(categoryId);
                row.remove();
                Toast.toastShow("toast-success", icon_success, "DELETE SUCCESS", "Category deleted successfully");
            } catch (error) {
                Toast.toastShow("toast-error", icon_error, "DELETE FAILED", "Failed to delete category");
            }
        });
        return deleteIcon;
    }

    render() {
        return this.container;
    }
}
