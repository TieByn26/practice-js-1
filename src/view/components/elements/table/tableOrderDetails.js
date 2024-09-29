import { ic_avatar_gray } from "@/constants";
import { elementHtml } from "@/utils";

const element = new elementHtml();
export class TableDetail{
    constructor(product){
        this.container = element.divELement("order-detail-container_left");
        this.headDetail();
        this.tableDetail(product);
    }
    headDetail(){
        const head = element.divELement("order-detail-container_left-span");
        const spanTitle = element.spanElement("","Order List");
        const spanProduct = element.spanElement("","1 Products");
        head.append(spanTitle, spanProduct);
        this.container.append(head);
    }
    tableDetail(product){
        const table = document.createElement("table");
        table.className = "order-detail-container_left-table";
        const headTitle = ["Product","SKU","QTY","Price","Total"];
        const thead = document.createElement("thead");
        const headRow = document.createElement("tr");
        headTitle.forEach(title => {
            const th = document.createElement("th");
            const spanTitle = element.spanElement("",title);
            th.appendChild(spanTitle);
            headRow.appendChild(th);
        });
        thead.appendChild(headRow);
        table.appendChild(thead);

        /**
         * display data 
         */
        const tbody = document.createElement("tbody");
        const productRow = document.createElement("tr");
        const keys = ["name","sku","qty","price","price"];
        keys.forEach(key => {
            const td = document.createElement("td");
            if (key === "name"){
                const div = element.divELement("div_name");
                const img = element.imgElement(ic_avatar_gray,"icon","");
                const divSpan = element.divELement("div_span");
                const spanName = element.spanElement("",product[key]);
                const spanColor = element.spanElement("","gray");
                divSpan.append(spanName, spanColor);
                div.append(img, divSpan);
                td.appendChild(div);
                productRow.appendChild(td);
                return;
            }
            if (key === "qty"){
                const span = element.spanElement("","1 pcs");
                td.appendChild(span);
                productRow.appendChild(td);
                return;
            }
            const span = element.spanElement("",product[key]);
            td.appendChild(span);
            productRow.appendChild(td);
        });
        tbody.appendChild(productRow)
        table.appendChild(tbody);
        
        const itemTotalPrice = [
            {content1:"",content2:"",content3:"",content4:"Subtotal",content5:product["price"]},
            {content1:"",content2:"",content3:"",content4:"VAT (0%)",content5:"$0"},
            {content1:"",content2:"",content3:"",content4:"Shipping Rate",content5:"$0"},
            {content1:"",content2:"",content3:"",content4:"Grand Total",content5:product["price"]},
        ]
        itemTotalPrice.forEach(obj => {
            const row = document.createElement("tr");
            row.className = "row-total-price";
            const keys = Object.keys(obj);
            keys.forEach(key => {
                const td = document.createElement("td");
                const span = element.spanElement("",obj[key]);
                td.appendChild(span);
                row.appendChild(td);
                tbody.appendChild(row);
            });
        });

        this.container.appendChild(table);
    }
    render(){
        return this.container;
    }
}
