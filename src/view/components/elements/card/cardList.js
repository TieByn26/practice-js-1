import { ic_total_seller, ic_total_revenue, ic_product, ic_balance} from "@/constants";
import { elementHtml } from "@/utils";
import { card } from "./card";

const cardItem = [
    {src: ic_total_seller, alt: "icon", name: "Total Revenue", sale: "$75,500", grow:"+10%"},
    {src: ic_total_revenue, alt: "icon", name: "Total Sales", sale: "31,500", grow:"+15%"},
    {src: ic_product, alt: "icon", name: "Product SKU", sale: "247", grow:"0%"},
    {src: ic_balance, alt: "icon", name: "Balance", sale: "$24,500", grow:"-25%"}
]
export const cardList = () => {
    const elHtml = new elementHtml();
    const container = elHtml.divELement("card-container");
    const ul = elHtml.ulElement("card-container_list");

    cardItem.forEach(item => {
        const li = elHtml.liElement("");
        li.innerHTML = card(item);
        ul.appendChild(li);
    })
    container.appendChild(ul);

    return container.outerHTML;
}
