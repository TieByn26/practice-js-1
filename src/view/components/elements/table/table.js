import { ic_chevron_down } from "@/constants"
import { elementHtml } from "@/utils";

const elHtml = new elementHtml();
export const tableSelling = (data = {}) => {
    const container = elHtml.divELement("top-container_left-main");
    const table = document.createElement('table');
    
    //table header
    const headers = [
        {label: "Product", icon: ic_chevron_down},
        {label: "Sales", icon: ic_chevron_down},
        {label: "Amount", icon: ic_chevron_down},
        {label: "Price", icon: ""},
        {label: "Status", icon: ""}
    ]
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");

    headers.forEach(item => {
        const th = document.createElement("th");
        const span = elHtml.spanElement("",item.label);
        if (item.icon != ""){
            const img = elHtml.imgElement(item.icon,"icon","");
            th.appendChild(span);
            th.appendChild(img);
        }else {
            th.appendChild(span);
        }
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    //table main
    data = [
        "text1", "text2", "text3", "text4", "text5"
    ]
    const tbody = document.createElement("tbody");
    const mainRow = document.createElement("tr");   

    data.forEach(item => {
        const td = document.createElement("td");
        const span = document.createElement("span");
        span.textContent = item;
        td.appendChild(span);
        mainRow.appendChild(td);
    });
    tbody.appendChild(mainRow);
    table.appendChild(tbody);

    container.appendChild(table);

    return container.outerHTML;
}
