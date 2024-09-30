import { ic_lock, ic_evenlope, ic_phone_c, ic_address, ic_cart } from "@/constants";
import { pic_avatar } from "@/constants";
import { elementHtml } from "@/utils";

const element = new elementHtml();
export class CardCustomer{
    constructor(customer){
        this.container = element.divELement("card-customer-container");
        this.initPhotoName(customer);
        this.initInformation(customer);
    }
    initPhotoName(customer){
        const div = element.divELement("card-customer-container_name");
        const img = element.imgElement(pic_avatar,"image","");
        const spanName =  element.divELement("card-customer-container_name-span");
        spanName.append(
            element.spanElement("",customer.name),
            element.spanElement("","Premium")
        );
        const spanNickName = element.spanElement("","@"+customer.name);
        const back = element.divELement("card-customer-container_name-back");
        div.append(back, img, spanName, spanNickName);
        this.container.appendChild(div);
    }
    initInformation(customer){
        const items = [
            {img:ic_lock, label: "User ID", content: "ID_"+customer.id},
            {img:ic_evenlope, label: "Billing Email", content: customer.mail},
            {img:ic_phone_c, label: "Phone Number", content: customer.phone},
            {img:ic_address, label: "Delivery Address", content: customer.address},
            {img:ic_cart, label: "Latest Transaction", content: customer.latest}
        ]
        items.forEach(item => {
            const div = element.divELement("card-customer-container_infor");
            const img = element.imgElement(item.img,"icon","");
            const divSpan = element.divELement("card-customer-container_infor-span");
            const spanTitle = element.spanElement("",item.label);
            const spanContent = element.spanElement("",item.content);
            divSpan.append(spanTitle, spanContent);
            div.append(img, divSpan);
            this.container.appendChild(div);
        });
    }
    render(){
        return this.container;
    }
}