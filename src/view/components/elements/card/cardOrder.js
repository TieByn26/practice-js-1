import { elementHtml } from "@/utils"
import { ic_address, ic_processing, ic_packer, ic_shipping, ic_success_gray, ic_cart_order } from "@/constants";

const element = new elementHtml();
export class CardOrder{
    constructor(tleft, tright,items){
        this.container = element.divELement("order-card");
        this.initCard(tleft, tright,items);
    }
    initCard(tleft, tright,items){
        //card title
        const title = element.divELement("order-card_title");
        const titleLeft = element.spanElement("order-card_title-left", tleft);
        const titleRight = element.spanElement("", tright);

        if (tright){
            const status = titleRight.textContent.startsWith("P") ? "processing-status": 
            titleRight.textContent.startsWith("S") ? "shiped-status":
            titleRight.textContent.startsWith("D") ? "delivered-status": "cancelled-status";
            titleRight.className = status;
        }
        title.append(titleLeft, titleRight);
                        
        //card main
        const mainCard = element.divELement("order-card_main");
        items.forEach(item => {
            console.log(item);
            const rowData = element.divELement("order-card_main-row");
            const rowDataLeft = element.divELement("order-card_main-row-left");
            const img = element.imgElement(item.icon,"icon","");
            const spanTitle = element.spanElement("",item.label);
            rowDataLeft.append(img, spanTitle);
            const data = element.spanElement("",item.data);
            rowData.append(rowDataLeft, data);
            mainCard.appendChild(rowData);
        });
        this.container.append(title, mainCard);
    }
    render(){
        return this.container;
    }
}
export class CardOrderDetail{
    constructor(customer){
        this.container = element.divELement("order-detail-container_right");
        this.initAddress(customer);
        this.initStatus();
    }
    initAddress(customer){
        const address = element.divELement("address-container");
        const title =  element.spanElement("address-container_title","Address");
        const main = element.divELement("address-container_main");
        for (let i = 1; i <= 2; i++) {
            const img = element.imgElement(ic_address,"icon","");
            const div = element.divELement("address-container_main-content");
            if (i === 1){
                const text = element.spanElement("","Billing");
                const content = element.spanElement("",customer.address);
                const divContent = element.divELement("address-container_main-content-span");
                divContent.append(text, content);
                div.append(img, divContent);
            } else {
                const text = element.spanElement("","Shipping");
                const content = element.spanElement("",customer.address);
                const divContent = element.divELement("address-container_main-content-span");
                divContent.append(text, content);
                div.append(img, divContent);
            }
            main.append(div);
        }
        address.append(title, main);
        this.container.appendChild(address);
    }
    initStatus(){
        const status = element.divELement("status-container");
        const title = element.spanElement("status-container_title","Order Status");
        const statusMain = element.divELement("status-container_main");
        statusMain.appendChild(this.orderPlaced());
        statusMain.appendChild(this.processing());
        statusMain.appendChild(this.packed());
        statusMain.appendChild(this.shipping());
        statusMain.appendChild(this.delivered());
        status.append(title, statusMain);
        this.container.appendChild(status);
    }
    orderPlaced(){
        const orderPlaced = element.divELement("status-container_main-placed");
        const imgContainer = element.divELement("status-container_main-placed--img");
        const img = element.imgElement(ic_cart_order,"icon","");
        const hr = document.createElement("hr");
        imgContainer.append(img, hr);
        const spanContainer = element.divELement("status-container_main-placed--span")
        const spanTitle = element.spanElement("","Order Placed");
        const spanContent = element.spanElement("","An order has been placed.");
        const spanDate = element.spanElement("","12/12/2022, 03:00");
        spanContainer.append(spanTitle, spanContent, spanDate);
        orderPlaced.append(imgContainer, spanContainer);
        return orderPlaced;
    }
    processing(){
        const processing = element.divELement("status-container_main-placed");
        const imgContainer = element.divELement("status-container_main-placed--img");
        const img = element.imgElement(ic_processing,"icon","");
        const hr = document.createElement("hr");
        imgContainer.append(img, hr);
        const spanContainer = element.divELement("status-container_main-placed--span")
        const spanTitle = element.spanElement("","Processing");
        const spanContent = element.spanElement("","Seller has proccessed your order.");
        const spanDate = element.spanElement("","12/12/2022, 03:15");
        spanContainer.append(spanTitle, spanContent, spanDate);
        processing.append(imgContainer, spanContainer);
        return processing;
    }
    packed(){
        const packed = element.divELement("status-container_main-packed");
        const imgContainer = element.divELement("status-container_main-packed--img");
        const img = element.imgElement(ic_packer,"icon","");
        const hr = document.createElement("hr");
        imgContainer.append(img, hr);

        const spanContainer = element.divELement("status-container_main-packed--span");
        const spanTitle = element.spanElement("","Packed");
        const spanDate = element.spanElement("","DD/MM/YY, 00:00");
        spanContainer.append(spanTitle, spanDate);

        packed.append(imgContainer, spanContainer);

        return packed;
    }
    shipping(){
        const packed = element.divELement("status-container_main-packed");
        const imgContainer = element.divELement("status-container_main-packed--img");
        const img = element.imgElement(ic_shipping,"icon","");
        const hr = document.createElement("hr");
        imgContainer.append(img, hr);

        const spanContainer = element.divELement("status-container_main-packed--span");
        const spanTitle = element.spanElement("","Shipping");
        const spanDate = element.spanElement("","DD/MM/YY, 00:00");
        spanContainer.append(spanTitle, spanDate);

        packed.append(imgContainer, spanContainer);

        return packed;

    }
    delivered(){
        const delivered = element.divELement("status-container_main-delivered");
        const img = element.imgElement(ic_success_gray,"icon","");
        const spanContainer = element.divELement("status-container_main-delivered--span");
        const spanTitle = element.spanElement("","Delivered");
        const spanDate = element.spanElement("","DD/MM/YY, 00:00");
        spanContainer.append(spanTitle, spanDate);

        delivered.append(img, spanContainer);
        return delivered;
    }
    render(){
        return this.container;
    }
}
