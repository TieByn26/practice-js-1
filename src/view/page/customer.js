import { elementHtml } from "@/utils";
import { HeadCustomer, TableCustomer} from "../components";

const element = new elementHtml();
export class customer {
    constructor() {
        this.container = element.divELement("customer-container");
        this.initHead();
        this.initTable();
    }
    initHead(){
        const head = new HeadCustomer();
        this.container.appendChild(head.render());
    }
    initTable(){
        const main = element.divELement("customer-container-table");
        const table = new TableCustomer();
        main.appendChild(table.render());
        this.container.appendChild(main);
    }

    render(){
        return this.container;
    }
}