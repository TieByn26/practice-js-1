import { elementHtml } from "@/utils";
import { pic_chart2, ic_arrow_down, ic_arrow_up, ic_dots_vertical, pic_chart1, pic_dot } from "@/constants";

const elHtml = new elementHtml();

// helper function to create a figure element with an image
const createFigureWithImage = (imgSrc, imgClass = "icon") => {
    const figure = document.createElement("figure");
    const img = elHtml.imgElement(imgSrc, imgClass, "");
    figure.appendChild(img);
    return figure;
};

export const listDesc = () => {
    const list = [
        { label1: "Target", label2: "$20k", src: ic_arrow_down },
        { label1: "Revenue", label2: "$16k", src: ic_arrow_up },
        { label1: "Today", label2: "$1.5k", src: ic_arrow_up }
    ];
    
    const ul = elHtml.ulElement("");
    
    list.forEach(item => {
        const li = document.createElement("li");
        const div = document.createElement("div");
        div.append(elHtml.spanElement("", item.label2), elHtml.imgElement(item.src, "icon", ""));
        li.append(elHtml.spanElement("", item.label1), div);
        ul.appendChild(li);
    });

    return ul.outerHTML;
};

export const saleProgressChart = () => {
    const container1 = elHtml.divELement("chart-container_left");

    // Header section
    const container2 = elHtml.divELement("chart-container_left-header");
    const container3 = elHtml.divELement("");
    const span1 = elHtml.spanElement("title-main", "Sales Progress");
    const span2 = elHtml.spanElement("title", "This Quarter");
    const figure1 = createFigureWithImage(ic_dots_vertical);

    container3.append(span1, span2);
    container2.append(container3, figure1);

    // Main section
    const container4 = elHtml.divELement("chart-container_left-main");
    const figure2 = createFigureWithImage(pic_chart1, "icon");
    const container5 = elHtml.divELement("main-desc");
    const span3 = document.createElement("span");
    span3.innerHTML = 'You succeed earn <span>$240</span> today, its higher than yesterday';

    // List description
    const container6 = elHtml.divELement("");
    container6.innerHTML = listDesc();

    container5.append(span3, container6);
    container4.append(figure2, container5);

    container1.append(container2, container4);

    return container1;
};

export const statistics = () => {
    const container1 = elHtml.divELement("chart-container_right");

    // Header section
    const container2 = elHtml.divELement("chart-container_right-header");
    const div1 = elHtml.divELement("header-desc");
    const span1 = elHtml.spanElement("title-main", "Statistics");
    const span2 = elHtml.spanElement("title", "Revenue and Sales");

    const div2 = elHtml.divELement("header-image");
    const figure1 = createFigureWithImage(pic_dot, "img");
    const figure2 = createFigureWithImage(ic_dots_vertical, "icon");
    figure2.className = "figure-image";

    div1.append(span1, span2);
    div2.appendChild(figure1);

    container2.append(div1, div2, figure2);

    // Main section
    const container3 = elHtml.divELement("chart-container_right-main");
    const figure3 = createFigureWithImage(pic_chart2, "img");

    container3.appendChild(figure3);
    container1.append(container2, container3);

    return container1;
};
