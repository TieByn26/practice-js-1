import { elementHtml } from "@/utils";
import { ic_filter, ic_dots_vertical } from "@/constants";

const elHtml = new elementHtml();

export const headSelling = () => {
    const container1 = elHtml.divELement("top-container_left-header");
    const span1 = elHtml.spanElement("", "Top Selling Product");

    const container2 = elHtml.divELement("");
    const img = elHtml.imgElement(ic_filter, "icon", "");
    const span2 = elHtml.spanElement("", "Filters");

    container2.append(img, span2);
    container1.append(span1, container2);

    return container1;
};

export const headSaleLocation = () => {
    const container1 = elHtml.divELement("top-container_right-header");

    const container2 = elHtml.divELement("");
    const span1 = elHtml.spanElement("", "Sales by Location");
    const span2 = elHtml.spanElement("", "Sales performance by location");
    const image1 = elHtml.imgElement(ic_dots_vertical, "icon", "");

    container2.append(span1, span2);
    container1.append(container2, image1);

    return container1;
};
