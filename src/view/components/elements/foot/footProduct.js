import { elementHtml } from "@/utils";
import { ic_chevron, ic_avatar_gray, ic_eye, ic_pen, ic_trash, icon_success, icon_error } from "@/constants";
import { productController, CategoryController } from "@/controllers";
import { Link } from "../link";
import { Toast } from "../toast/toast";
import { Pagination } from "@/utils";

const element = new elementHtml();

export class FootProduct {
    constructor(products, categories) {
        this.products = products;
        this.categories = categories;
        this.pagination = new Pagination(10, products.length);
        this.container = element.divELement("product-container-foot");
        this.initFoot();
    }

    createButton(text = "", icon = "") {
        const button = document.createElement("button");
        if (icon) button.appendChild(element.imgElement(icon, "icon", ""));
        else button.textContent = text;
        return button;
    }

    initFoot() {
        const buttonContainer = element.divELement("product-container-foot_button");
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
        const end = Math.min(this.pagination.currentPage * this.pagination.itemOfPage, this.products.length);
        return `Showing ${start}-${end} from ${this.products.length}`;
    }

    updateActivePage(buttons, page) {
        this.pagination.currentPage = page;
        buttons.forEach(btn => btn.classList.remove("button-active"));
        buttons[page - 1].classList.add("button-active");

        const spanTitle = this.container.querySelector("span");
        spanTitle.textContent = this.getDisplayText();

        const table = document.querySelector(".table-product");
        table.querySelector("tbody").replaceChildren(this.createTableMain(this.pagination.getCurrentPageItems(this.products)));
    }

    createTableMain(productPageData) {
        const tbody = document.createElement("tbody");

        productPageData.forEach(async (Product) => {
            const tr = document.createElement("tr");
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
                    checkToDelete = tr;
                } else if (key === "categoryId") {
                    const category = this.categories.find(c => c.id === Product.categoryId);
                    td.textContent = category ? category.name : "Unknown";
                } else if (key === "status") {
                    const statusClass = {
                        "O": "out-stock-status",
                        "L": "low-stock-status",
                        "D": "draft-status",
                        "P": "published-status"
                    }[Product[key][0]] || "default-status";
                    const span = element.spanElement(statusClass, Product[key]);
                    td.appendChild(span);
                } else {
                    td.textContent = Product[key];
                }
                tr.appendChild(td);
            }

            const tdActions = document.createElement("td");
            tdActions.append(
                this.createLinkIcon(`/product-detail/${Product.id}`, ic_eye),
                this.createLinkIcon(`/404`, ic_pen),
                this.createDeleteIcon(checkToDelete, Product.id)
            );
            tr.appendChild(tdActions);
            tbody.appendChild(tr);
        });

        return tbody;
    }

    createLinkIcon(url, icon) {
        const link = new Link(url).render();
        link.appendChild(element.imgElement(icon, "icon", ""));
        return link;
    }

    createDeleteIcon(row, productId) {
        const deleteIcon = element.imgElement(ic_trash, "icon", "delete-icon");
        deleteIcon.addEventListener('click', async () => {
            try {
                await productController.deleteProduct(productId);
                row.remove();
                Toast.toastShow("toast-success", icon_success, "DELETE SUCCESS", "Product deleted successfully");
            } catch (error) {
                Toast.toastShow("toast-error", icon_error, "DELETE FAILED", "Failed to delete product");
            }
        });
        return deleteIcon;
    }

    render() {
        return this.container;
    }
}
