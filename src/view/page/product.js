import { elementHtml } from "@/utils";
import { FootProduct, HeadProduct } from "../components";
import { TableProduct } from "../components";

const element = new elementHtml();
export class product {
    constructor() {
        this.container = element.divELement("product-container");
        this.initHead();
        this.initTable();
    }
    initHead(){
        const head = new HeadProduct().render();
        this.container.appendChild(head);
    }
    initTable(){
        const tableContainer = element.divELement("product-table-container");
        const table = new TableProduct().render();
        const foot = new FootProduct().render();
        tableContainer.append(table, foot);
        this.container.appendChild(tableContainer);
    }
    render(){
        return this.container;
    }
}