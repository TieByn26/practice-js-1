import { elementHtml } from "@/utils";
import { HeadCustomerDetail, CardCustomer, CardListCustomer, TableCustomerDetail } from "../components";
import { router } from "@/routes";
import { CustomerController, OrderController } from "@/controllers";

const element = new elementHtml();
export class customerdetail {
    constructor() {
        this.container = element.divELement("customer-detail-container");
        this.initHead();
        this.initBody();
    }
    initHead(){
        const head = new HeadCustomerDetail().render();
        this.container.appendChild(head);
    }
    async initBody(){
        const id = router.getParam().customerId;
        const customer = await CustomerController.getCustomerFollowId(id);
        const orders = await OrderController.getOrderFollowIdCus(id,1);
        const body = element.divELement("customer-detail-container_body");
        const card = new CardCustomer(customer).render();
        const right = element.divELement("customer-detail-container_body-right");
        const cardList = new CardListCustomer(customer).render();
        const table = new TableCustomerDetail(orders).render();
        right.append(cardList, table);
        body.append(card, right);
        this.container.appendChild(body);
    }
    render(){
        return this.container;
    }
}
