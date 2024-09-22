import { ic_chevron_down } from "@/constants";
import { elementHtml } from "@/utils";
import { topSale, product } from "@/models";
import { ic_avatar_gray } from "@/constants";

const elHtml = new elementHtml();

export class tableContainer {
    constructor() {

    }
    /**
 * Create table and handle data , display data in row data
 * Handle status 
 * @returns {HTMLElement}
 */

    static tableSelling(data = []) {
        const container = elHtml.divELement("top-container_left-main");
        const table = document.createElement("table");

        /**
         * table of header
         */
        const headers = [
            { label: "Product", icon: ic_chevron_down },
            { label: "Sales", icon: ic_chevron_down },
            { label: "Amount", icon: ic_chevron_down },
            { label: "Price" },
            { label: "Status" }
        ];

        const thead = document.createElement("thead");
        const headRow = document.createElement("tr");

        headers.forEach(({ label, icon }) => {
            const th = document.createElement("th");
            const span = elHtml.spanElement("", label);
            th.appendChild(span);

            /**Append icon if it exists */
            if (icon) {
                const img = elHtml.imgElement(icon, "icon", "");
                th.appendChild(img);
            }

            headRow.appendChild(th);
        });

        thead.appendChild(headRow);
        table.appendChild(thead);

        /**
         * table of body
         */
        const tbody = document.createElement("tbody");

        const rowData = data.length > 0 ? data : ["text1", "text2", "text3", "text4", "text5"];

        const mainRow = document.createElement("tr");
        rowData.forEach(item => {
            const td = document.createElement("td");
            const span = elHtml.spanElement("", item);
            td.appendChild(span);
            mainRow.appendChild(td);
        });

        tbody.appendChild(mainRow);
        table.appendChild(tbody);

        container.appendChild(table);

        return container;
    };
    static async handleDisPlayData(data) {
        const obj = await data;
        if (obj[0] instanceof topSale) {
            return this.tableSaleLocation(obj);
        }
        return this.tableSelling(obj);
    };
    static tableSaleLocation(obj) {
        const container = elHtml.divELement("top-container_right-main");
        const table = document.createElement("table");
        const listTopSale = obj;
        const tbody = document.createElement("tbody");

        listTopSale.forEach(obj => {
            const mainRow = document.createElement("tr");
            const keys = Object.keys(obj);

            keys.forEach((key, index) => {
                if (index === 1) return;
                const td = document.createElement("td");

                if (index === 0) {
                    const div = elHtml.divELement();
                    const spanName = elHtml.spanElement("", obj[key]);
                    const spanSale = elHtml.spanElement("", obj[keys[1]]);
                    const imgProduct = elHtml.imgElement(ic_avatar_gray, "icon", "");
                    div.append(spanName, spanSale);
                    td.append(imgProduct, div);
                } else if (index === keys.length - 1) {
                    const status = obj[key].startsWith("+") ? `capital-profit` :
                        obj[key].startsWith("-") ? `capital-loss` : `equal-capital`;
                    td.append(elHtml.spanElement(status, obj[key]));
                } else {
                    td.append(elHtml.spanElement("", obj[key]));
                }

                mainRow.appendChild(td);
            });

            tbody.appendChild(mainRow);
        });

        table.appendChild(tbody);
        container.appendChild(table);

        return container;
    }
}
