import { elementHtml } from "@/utils";
import { HeadCategories } from "../components/elements/head/headCategories";
import { TableCategory } from "../components/elements/table/tableCategory";
import { FootCategory } from "../components/elements/foot/footCategory";
import { CategoryController } from "@/controllers";

const element = new elementHtml();
export class categories {
    constructor() {
        this.container = element.divELement("category-container");
        this.handleData();
    }
    initHead(category){
        const head = new HeadCategories(category).render();
        this.container.appendChild(head);
    }
    initTable(category){
        const tableContainer = element.divELement("category-container-table");
        const table = new TableCategory(category).render();
        const foot = new FootCategory(category).render();
        tableContainer.appendChild(table);
        tableContainer.appendChild(foot);
        this.container.appendChild(tableContainer);
    }
    async handleData() {
        const category = await CategoryController.getAllCategory();
        this.initHead(category);
        this.initTable(category);
    }
    render(){
        return this.container;
    }
}