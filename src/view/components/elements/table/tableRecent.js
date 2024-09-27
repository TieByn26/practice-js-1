import { axiosApiGetData, elementHtml, endpointUrl } from "@/utils";
import { ic_chevron_down, ic_avatar_gray, ic_pen, ic_eye} from "@/constants";
import { Link } from "../link";
import { CustomerController, OrderController } from "@/controllers";

const elHtml = new elementHtml();
export class TableRecent {
    constructor() {}

    static async tableRecentOrder(obj) {
        const table = document.createElement("table");
        table.className = "table-for-recent-order";
        
        // Header of table
        const headers = [
            { label: "Order ID", input: "checkbox" },
            { label: "Product", icon: ic_chevron_down },
            { label: "Date", icon: ic_chevron_down },
            { label: "Customer" },
            { label: "Total", icon: ic_chevron_down },
            { label: "Payment" },
            { label: "Status", icon: ic_chevron_down },
            { label: "Action" }
        ];

        const thead = document.createElement("thead");
        const headRow = document.createElement("tr");

        headers.forEach(({ label, icon, input }) => {
            const th = document.createElement("th");
            if (input) {
                const checkbox = document.createElement("input");
                checkbox.type = input;
                th.appendChild(checkbox);
            }
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

        const tbody = await this.createTableMain(obj);
        table.appendChild(tbody);

        // Append the table to the container
        return table;
    }

    static async createTableMain(obj) {
        const tbody = document.createElement("tbody");
        const orders = obj;

        for (const order of orders) {
            const mainRow = document.createElement("tr");
            const keys = ["id", "name", "added", "customerId", "total", "payment", "status"];

            for (const key of keys) {
                const td = document.createElement("td");

                if (key === "id") {
                    const div = document.createElement("div");
                    const input = document.createElement("input");
                    input.type = "checkbox";
                    const span = elHtml.spanElement("", "# " + order[key]);
                    div.append(input, span);
                    td.appendChild(div);
                    mainRow.appendChild(td);
                    continue;
                }

                if (key === "name") {
                    const div = document.createElement("div");
                    const img = elHtml.imgElement(ic_avatar_gray, "icon", "");
                    const span = elHtml.spanElement("", order[key]);
                    div.append(img, span);
                    td.appendChild(div);
                    mainRow.appendChild(td);
                    continue;
                }

                if (key === "customerId") {
                    const customer = await CustomerController.getCustomerFollowId(order[key]);
                    const div = document.createElement("div");
                    const spanName = elHtml.spanElement("", customer.name);
                    const spanMail = elHtml.spanElement("", customer.mail);
                    div.append(spanName, spanMail);
                    td.appendChild(div);
                    mainRow.appendChild(td);
                    continue;
                }

                const span = elHtml.spanElement("", order[key]);
                if (key === "status") {
                    const status = order[key].startsWith("P") ? "processing-status" :
                                   order[key].startsWith("S") ? "shipped-status" :
                                   order[key].startsWith("D") ? "delivered-status" : "cancelled-status";
                    span.className = status;
                }

                td.appendChild(span);
                mainRow.appendChild(td);
            }

            const td = document.createElement("td");
            const detailLink = new Link(`/order-detail/${order["id"]}`).render();
            const imgEye = elHtml.imgElement(ic_eye, "icon", "");
            detailLink.appendChild(imgEye);

            const updateLink = new Link(`/order-update/${order["id"]}`).render();
            const imgPen = elHtml.imgElement(ic_pen, "icon", "");
            updateLink.appendChild(imgPen);

            td.append(detailLink, updateLink);
            mainRow.appendChild(td);
            tbody.appendChild(mainRow);
        }

        return tbody;
    }
}
