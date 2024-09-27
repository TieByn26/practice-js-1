import { HeadOrder, TableRecent, FootRecent } from "../components";
import { OrderController } from "@/controllers";
import { elementHtml } from "@/utils";

const element = new elementHtml();

export class order {
    constructor() {
        this.container = element.divELement("order-container");
        this.initHeadOrder();
        this.initOrderList();
    }

    initHeadOrder() {
        this.container.appendChild(HeadOrder.headTop());
        this.container.appendChild(HeadOrder.headBottom());
    }

    async initOrderList() {
        const orderListContainer = element.divELement("order-container-list");
        const data = await this.handleData(OrderController.getListOrder(1));

        if (data) {
            const table = await TableRecent.tableRecentOrder(data);
            orderListContainer.appendChild(table);
            orderListContainer.appendChild(FootRecent.createFootRecent());
        } else {
            console.log("No data found");
        }

        this.container.appendChild(orderListContainer);
    }

    async handleData(data) {
        try {
            return await data;
        } catch (error) {
            console.error("Error fetching data: ", error);
            return null;
        }
    }

    render() {
        return this.container;
    }
}
