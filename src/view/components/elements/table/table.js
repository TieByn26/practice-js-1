import { ic_chevron_down } from "@/constants";
import { elementHtml } from "@/utils";
import { topSale, product } from "@/models";
import { ic_avatar_gray } from "@/constants";
import { productController } from "@/controllers";



const elHtml = new elementHtml();

export class tableContainer {
    constructor() {

    }
    /**
     * Create table and handle data , display data in row data
     * Handle status 
     * @returns {HTMLElement}
     */
    static tableSelling(data) {
        const container = elHtml.divELement("top-container_left-main");
        const table = document.createElement("table");
        table.className = "table-for-selling";
    
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
    
            /** Append icon if it exists */
            if (icon) {
                const img = elHtml.imgElement(icon, "icon", "");
                th.appendChild(img);
            }
    
            headRow.appendChild(th);    
        });
    
        thead.appendChild(headRow);
        table.appendChild(thead);
        const tbody = this.createTableMain(data);
        table.appendChild(tbody);
    
        // Append the table to the container
        container.appendChild(table);
        
        return container;
    }
    static createTableMain(obj){
        const tbody = document.createElement("tbody");
        const listTopSelling = obj;
        
        listTopSelling.forEach(obj => {
            const mainRow = document.createElement("tr");
            const keys = ["sku","name","sales","amount","price","status"];
    
            keys.forEach((key, index) => {
                if (key === "name") return;
                
                if (key === "sku") {
                    const td = document.createElement("td");
                    const div  = document.createElement("div");
                    const img = elHtml.imgElement(ic_avatar_gray,"icon","");
                    const spanName = elHtml.spanElement("", obj[keys[1]]);
                    const spanSku = elHtml.spanElement("","SKU: "+obj[key]);
                    div.appendChild(spanName);
                    div.appendChild(spanSku);
                    td.append(img, div);
                    mainRow.appendChild(td);
                    return;
                }
    
                if (key === "status") {
                    const status = obj[key].startsWith("O") ? "out-stock-status" :
                                   obj[key].startsWith("L") ? "low-stock-status" : 
                                   obj[key].startsWith("D") ? "draft-status" : "published-status";
                    const span = elHtml.spanElement(status, obj[key]);
                    const td = document.createElement("td");
                    td.appendChild(span);
                    mainRow.appendChild(td);
                    
                    return;
                }
    
                const td = document.createElement("td");
                td.appendChild(elHtml.spanElement("", obj[key]));
                mainRow.appendChild(td);
            });
            tbody.appendChild(mainRow);
        });
        return tbody;
    }
    
    
    /**
     * 
     * @param {promise} data 
     * @returns 
     */

    /**
     * 
     * @param {obj} obj 
     * @returns 
     */
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
