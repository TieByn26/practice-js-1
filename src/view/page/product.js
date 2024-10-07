import { elementHtml } from "@/utils";
import { FootProduct, HeadProduct } from "../components";
import { TableProduct } from "../components";
import { CategoryController, productController } from "@/controllers";

const element = new elementHtml();
export class product {
    constructor() {
        this.container = element.divELement("product-container");
        this.handleData();
    }
    initHead(products, categories){
        const head = new HeadProduct(products, categories).render();
        this.container.appendChild(head);
    }
    initTable(products, categories){
        const tableContainer = element.divELement("product-table-container");
        const table = new TableProduct(products, categories).render();
        const foot = new FootProduct(products, categories).render();
        tableContainer.append(table, foot);
        this.container.appendChild(tableContainer);
    }
    async handleData(){
        const products = await productController.getAllProduct();
        const categories = await CategoryController.getAllCategory();
        this.initHead(products, categories);
        this.initTable(products, categories);
    }
    render(){
        return this.container;
    }
}