import { elementHtml } from "@/utils";
import { HeadCategories } from "../components/elements/head/headCategories";
import { TableCategory } from "../components/elements/table/tableCategory";
import { FootCategory } from "../components/elements/foot/footCategory";

const element = new elementHtml();
export class categories {
    constructor() {
        this.container = element.divELement("category-container");
        this.initHead();
        this.initTable();
    }
    initHead(){
        const head = new HeadCategories().render();
        this.container.appendChild(head);
    }
    initTable(){
        const tableContainer = element.divELement("category-container-table");
        const table = new TableCategory().render();
        const foot = new FootCategory().render();
        tableContainer.appendChild(table);
        tableContainer.appendChild(foot);
        this.container.appendChild(tableContainer);
    }
    render(){
        return this.container;
    }
}