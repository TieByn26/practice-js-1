import { dtoMethod } from "../common"
export const typeofOrder= {
    id: 0,
    name: "",
    added: "",
    total: "",
    payment: "",
    method: "",
    status: "", 
    invoice: "",
    shipping: "",
    rewards: "",
    customerId: 0,
    productId: 0
}
export class Orders{
    constructor({id, name, added, total, payment, method, status, invoice, shipping, rewards, customerId, productId}){
        this.id = id;
        this.name = name;
        this.added = added;
        this.total = total;
        this.payment = payment;
        this.method = method;
        this.status = status;
        this.invoice = invoice;
        this.shipping = shipping;
        this.rewards = rewards;
        this.customerId = customerId;
        this.productId = productId;
    }
}
