import { elementHtml } from "@/utils";
import { FootCustomer, HeadCustomer, TableCustomer} from "../components";
import { CustomerController } from "@/controllers";

const element = new elementHtml();
export class customer {
    constructor() {
        this.container = element.divELement("customer-container");
        this.handleData();
    }
    initHead(customers){
        const head = new HeadCustomer(customers);
        this.container.appendChild(head.render());
    }
    initTable(customers){
        const main = element.divELement("customer-container-table");
        const table = new TableCustomer(customers);
        const foot = new FootCustomer(customers);
        main.appendChild(table.render());
        main.appendChild(foot.render());
        this.container.appendChild(main);
    }
    async handleData(){
        const customers = await CustomerController.getAllCustomer();
        this.initHead(customers);
        this.initTable(customers);
    }

    render(){
        return this.container;
    }
}