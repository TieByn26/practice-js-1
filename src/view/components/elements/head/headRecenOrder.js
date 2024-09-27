import { elementHtml } from "@/utils";
import { ic_filter } from "@/constants";
import { button } from "../button";
const element = new elementHtml();
const createButton = new button();
export class HeadRecentOrder {
    constructor() {
    }
    static headContent() {
        const container = element.divELement("head-recent-order");
        const containerLeft = element.divELement("head-recent-order_left");
        const spanTitle = element.spanElement("span-title", "Recent Orders");
        const spanOrder = element.spanElement("span-order", "+2 Orders");
        containerLeft.append(spanTitle, spanOrder);

        const containerMidle = element.divELement("head-recent-order_middle");
        const imgFilter = element.imgElement(ic_filter,"icon","");
        const spanFilter = element.spanElement("","Filters");
        containerMidle.append(imgFilter, spanFilter);

        const buttonSeeMore = createButton.render("button-blue",{to: '/order', label : 'See More',icon: ""});

        container.append(containerLeft, containerMidle, buttonSeeMore);
        return container;
    }
    static render() {
        return this.headContent();
    }
}