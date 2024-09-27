import { HeadOrder, TableRecent, FootRecent } from "../components";
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
    initOrderList() {
        const orderListContainer = element.divELement("order-container-list");
        orderListContainer.appendChild(TableRecent.tableRecentOrder());
        orderListContainer.appendChild(FootRecent.createFootRecent());
        this.container.appendChild(orderListContainer);
    }
    render() {
        return this.container;
    }
}
