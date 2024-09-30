import { elementHtml } from "@/utils";
import { FootCustomer, HeadCustomer, TableCustomer} from "../components";

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
        const foot = new FootCustomer();
        main.appendChild(table.render());
        main.appendChild(foot.render());
        this.container.appendChild(main);
    }

    render(){
        return this.container;
    }
}