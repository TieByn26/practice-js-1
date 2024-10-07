import { HeadOrder, TableRecent, FootRecent } from "../components";
import { CustomerController, OrderController } from "@/controllers";
import { elementHtml } from "@/utils";

const element = new elementHtml();

export class order {
    constructor() {
        this.container = element.divELement("order-container");
        this.handleData();
    }

    initHeadOrder() {
        this.container.appendChild(HeadOrder.headTop());
        this.container.appendChild(HeadOrder.headBottom());
    }

    initOrderList(orders, customers) {
        const orderListContainer = element.divELement("order-container-list");
        const table = new TableRecent(orders, customers);
        const foot = new FootRecent(orders, customers);
        orderListContainer.appendChild(table.render());
        orderListContainer.appendChild(foot.render());
        this.container.appendChild(orderListContainer);
    }

    async handleData() {
        const orders = await OrderController.getAllOrder();
        const customers = await CustomerController.getAllCustomer();
        this.initHeadOrder();
        this.initOrderList(orders, customers);
    }

    render() {
        return this.container;
    }
}
