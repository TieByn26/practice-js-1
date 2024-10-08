import { card } from "./card";
import { elementHtml } from "@/utils";
import { ic_wallet, ic_cart_red, ic_reward_blue} from "@/constants";

const element = new elementHtml();
export class CardListCustomer{
    constructor(customer){
        this.container = element.divELement("card-list_customer-container");
        this.initListCard(customer);
    }
    initListCard(customer){
        const items = [
            {src: ic_wallet, alt: "icon", name: "Total Balance", sale: customer.balance, grow:"+25%"},
            {src: ic_cart_red, alt: "icon", name: "Total Orders", sale: customer.orders, grow:"+10%"},
            {src: ic_reward_blue, alt: "icon", name: "Rewards Point", sale: customer.point, grow:"+10%"},
        ]
        items.forEach(item => {
            this.container.appendChild(card(item));
        });
    }
    render(){
        return this.container;
    }
}