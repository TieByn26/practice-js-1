import { OrderController , CustomerController, productController} from "@/controllers";
import { elementHtml } from "@/utils";
import { HeadOrderDetail, TableDetail } from "../components";
import { CardOrder, CardOrderDetail } from "../components";
import { router } from "@/routes";
import { Orders, Customer, product } from "@/models";
import { ic_calendar_c, ic_payment, ic_shipping,
    ic_customer_c, ic_evenlope, ic_phone_c ,
    ic_receipt_c, ic_reward
 } from "@/constants";

const element = new elementHtml();
export class orderdetail {
    constructor() {
        this.container = element.divELement("order-detail-container");
        this.initCardOrder();
    }
    initHeadOrder(order){
        const head = new HeadOrderDetail(order).render();
        this.container.appendChild(head);
    }
    async initCardOrder(){
        const id = router.getParam();
        const orderData = await OrderController.getOrderFollowId(id.orderId);
        const order = new Orders(orderData);
        const customerData = await CustomerController.getCustomerFollowId(order.customerId)
        const customer = new Customer(customerData);
        const productData = await productController.getProductFollowId(order.productId);
        const Product = new product(productData);
        const itemf = [
            {icon:ic_calendar_c,label:"Added",data:order.added},
            {icon:ic_payment,label:"Payment Method",data:order.payment},
            {icon:ic_shipping,label:"Shipping Method",data:order.method}
        ];
        const items = [
            {icon:ic_customer_c,label:"Customer",data:customer.name},
            {icon:ic_evenlope,label:"Email",data:customer.mail},
            {icon:ic_phone_c,label:"Phone",data:customer.phone}
        ];
        const itemt = [
            {icon:ic_receipt_c,label:"Invoice",data:order.invoice},
            {icon:ic_shipping,label:"Shipping",data:order.shipping},
            {icon:ic_reward,label:"Rewards",data:order.rewards}
        ];
        const cardContainer = element.divELement("order-card-container");
        cardContainer.append(
            new CardOrder(`Order #${order.id}`,order.status,itemf).render(),
            new CardOrder(`Customer`,"",items).render(),
            new CardOrder(`Document`,"",itemt).render()
            
        );
        this.initHeadOrder(order);
        this.container.appendChild(cardContainer);
        this.initDetail(customer, Product);
    }
    initDetail(customer, product){
        const detailContainer = element.divELement("order-main-detail-container");
        detailContainer.appendChild(new TableDetail(product).render());
        detailContainer.appendChild(new CardOrderDetail(customer).render());
        this.container.appendChild(detailContainer);
    }
    render(){
        return this.container;
    }
}
