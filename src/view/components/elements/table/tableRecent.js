import { elementHtml } from "@/utils";
import { ic_chevron_down } from "@/constants";
import { ic_avatar_gray, ic_pen, ic_eye } from "@/constants";
import { Link } from "../link";
const elHtml = new elementHtml();
export class TableRecent{
    constructor(){

    }
    static data = [
        {
            id: 302012,
            name:"Handmade Pound",
            added: "24 Dec 2022",
            total: "$121.00",
            payment: "Mastercard",
            method: "Flat Shipping",
            status: "Processing",
            customerId: 1
    },{
        id: 302012,
        name:"Handmade Pound",
        added: "24 Dec 2022",
        total: "$121.00",
        payment: "Mastercard",
        method: "Flat Shipping",
        status: "Delivered",
        customerId: 1
}
    ]
    static tableRecentOrder(){
        const table = document.createElement("table");
        table.className = "table-for-recent-order";
        //header of table
        const headers = [
            { label: "Order ID", input: "checkbox" },
            { label: "Product", icon: ic_chevron_down },
            { label: "Date", icon: ic_chevron_down },
            { label: "Customer" },
            { label: "Total", icon: ic_chevron_down},
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
        const tbody = this.createTableMain(this.data);
        table.appendChild(tbody);
    
        // Append the table to the container
        
        return table;
    }
    static createTableMain(obj){
        const tbody = document.createElement("tbody");
        const orders = obj;
        console.log(orders);

        orders.forEach(obj => {
            const mainRow = document.createElement("tr");
            const keys = ["id","name","added","customerId","total","payment","status"];

            keys.forEach(key => {
                const td = document.createElement("td");
                
                if (key === "id") {
                    const div  = document.createElement("div");
                    const input = document.createElement("input");
                    input.type = "checkbox";
                    const span = elHtml.spanElement("","# "+obj[key]);
                    div.append(input,span);
                    td.appendChild(div);
                    mainRow.appendChild(td);

                    return;
                }
                if (key === "name"){
                    const div  = document.createElement("div");
                    const img = elHtml.imgElement(ic_avatar_gray,"icon","");
                    const span = elHtml.spanElement("",obj[key]);
                    div.append(img, span);
                    td.appendChild(div);
                    mainRow.appendChild(td);

                    return;
                }
                //sua lai sau khi test
                if (key === "customerId") {
                    const div  = document.createElement("div");
                    const spanName = elHtml.spanElement("","John Bushmill");
                    const spanMail = elHtml.spanElement("","Johnb@mail.com");
                    div.append(spanName, spanMail);
                    td.appendChild(div);
                    mainRow.appendChild(td);

                    return;
                }
                const span = elHtml.spanElement("",obj[key]);
                if (key === "status"){
                    const status = obj[key].startsWith("P") ? "processing-status" :
                                   obj[key].startsWith("S") ? "shiped-status" : 
                                   obj[key].startsWith("D") ? "delivered-status" : "cancelled-status";
                    span.className = status;
                }
                td.appendChild(span);
                mainRow.appendChild(td);

            });
            const td = document.createElement("td");
            const detailLink = new Link("/order-detail/1").render();
            const imgEye = elHtml.imgElement(ic_eye,"icon","");
            detailLink.appendChild(imgEye);

            const updateLink = new Link("/order-update/1").render();
            const imgPen = elHtml.imgElement(ic_pen,"icon","");
            updateLink.appendChild(imgPen);

            td.append(detailLink, updateLink);
            mainRow.appendChild(td);
            tbody.appendChild(mainRow);
        });
        return tbody;
    }
    static createRouteOrderDetail(){
        
    }
}
