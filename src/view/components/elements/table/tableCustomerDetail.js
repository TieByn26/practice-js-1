import { elementHtml } from "@/utils";
import { button } from "../button";
import { ic_calendar, ic_filter , ic_chevron_down, ic_avatar_gray} from "@/constants";
import { FootCustomerDetail } from "../foot";
const element = new elementHtml();
export class TableCustomerDetail{
    constructor(orders){
        this.container = element.divELement("main-customer-detail");
        this.table = document.createElement("table");
        this.table.className = "main-customer-detail_table";
        this.initHeader();
        this.initThead();
        this.initTable(orders);
        this.container.appendChild(this.table);
        const foot = new FootCustomerDetail().render();
        this.container.appendChild(foot);
    }
    initHeader(){
        const header = element.divELement("main-customer-detail_head");
        const span = element.spanElement("","Transaction History");
        const buttons = element.divELement("button-container");
        buttons.append(
            new button().render("button-white",{to:"/404",label:"Select Date",icon:ic_calendar}),
            new button().render("button-white",{to:"/404",label:"Filters",icon:ic_filter})
        );
        header.append(span, buttons);
        this.container.appendChild(header);
    }
    initThead(){
        const titles = [
            {title: "Order ID"},
            {title: "Product"},
            {title: "Total",icon:ic_chevron_down},
            {title: "Status",icon:ic_chevron_down},
            {title: "Date",icon:ic_chevron_down}
        ]
        const thead = document.createElement("thead");
        const headRow = document.createElement("tr");
        titles.forEach(item => {
            const th = document.createElement("th");
            const span = element.spanElement("",item.title);
            th.appendChild(span);
            if (item.icon) {
                const img = element.imgElement(item.icon,"icon","");
                th.appendChild(img);
            }
            headRow.appendChild(th);
        });
        thead.appendChild(headRow);
        this.table.appendChild(thead);
    }
    initTable(orders){
        const tbody = document.createElement("tbody");
        orders.forEach(order => {
            const tr = document.createElement("tr");
            const keys = ["id","name","total","status","added"];
            keys.forEach(key => {
                const td = document.createElement("td");

                if (key === "id") {
                    const span = element.spanElement("", "#" + order[key]);
                    td.appendChild(span);
                    tr.appendChild(td);
                    return;
                }

                if (key === "name") {
                    const div = document.createElement("div");
                    const img = element.imgElement(ic_avatar_gray, "icon", "");
                    const span = element.spanElement("", order[key]);
                    div.append(img, span);
                    td.appendChild(div);
                    tr.appendChild(td);
                    return;
                }
                const span = element.spanElement("", order[key]);
                if (key === "status") {
                    const status = order[key].startsWith("P") ? "processing-status" :
                                   order[key].startsWith("S") ? "shipped-status" :
                                   order[key].startsWith("D") ? "delivered-status" : "cancelled-status";
                    span.className = status;
                }

                td.appendChild(span);
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        this.table.appendChild(tbody);
    }
    render(){
        return this.container;
    }
}
