import { elementHtml } from "@/utils";
import { pic_chart2 , ic_arrow_down, ic_arrow_up, ic_dots_vertical, pic_chart1, pic_dot} from "@/constants";

const elHtml = new elementHtml();

export const listDesc = () => {
    const list = [
        {label1:"Target", label2: "$20k", src: ic_arrow_down},
        {label1:"Revenue", label2: "$16k",src: ic_arrow_up},
        {label1:"Today", label2: "$1.5k",src: ic_arrow_up}
    ]
    const ul = elHtml.ulElement("");
    list.forEach(item => {
        const li = document.createElement("li");
        const div = document.createElement("div");
        div.appendChild(elHtml.spanElement("",item.label2));
        div.appendChild(elHtml.imgElement(item.src,"icon",""));
        li.appendChild(elHtml.spanElement("",item.label1));
        li.appendChild(div);
        ul.appendChild(li);
    });

    return ul.outerHTML;
}
export const saleProgressChart = () => {
    const container1 = elHtml.divELement("chart-container_left");

    // header
    const container2 = elHtml.divELement("chart-container_left-header");

    // desc
    const container3 = elHtml.divELement("");
    const span1 = elHtml.spanElement("title-main", "Sales Progress");
    const span2 = elHtml.spanElement("title", "This Quarter");

    // image
    const figure1 = document.createElement("figure");
    const img1 = elHtml.imgElement(ic_dots_vertical, "icon", "");

    // main
    const container4 = elHtml.divELement("chart-container_left-main");

    // image
    const figure2 = document.createElement("figure");
    const img2 = elHtml.imgElement(pic_chart1, "icon", "");

    // desc
    const container5 = elHtml.divELement("main-desc");
    const span3 = document.createElement("span");
    span3.innerHTML = 'You succeed earn <span>$240</span> today, its higher than yesterday';

    // list desc
    const container6 = elHtml.divELement("");
    container6.innerHTML = listDesc();

    // appendChild elements
    container5.appendChild(span3);
    container5.appendChild(container6);
    figure2.appendChild(img2);
    container4.appendChild(figure2);
    container4.appendChild(container5);

    container3.appendChild(span1);
    container3.appendChild(span2);
    figure1.appendChild(img1);
    container2.appendChild(container3);
    container2.appendChild(figure1);

    container1.appendChild(container2);
    container1.appendChild(container4);

    return container1.outerHTML;
}

export const statistics = () => {
    const container1 = elHtml.divELement("chart-container_right");

    const container2 = elHtml.divELement("chart-container_right-header");

        const div1 = elHtml.divELement("header-desc");
            const span1 = elHtml.spanElement("title-main","Statistics");
            const span2 = elHtml.spanElement("title","Revenue and Sales");

        const div2 = elHtml.divELement("header-image");
            const figure1 = document.createElement("figure");
                const img1 = elHtml.imgElement(pic_dot,"img","");
        const figure2 = document.createElement("figure");
        figure2.className ="figure-image";
            const img2 = elHtml.imgElement(ic_dots_vertical,"icon","");

    const container3 = elHtml.divELement("chart-container_right-main");
        const figure3 = document.createElement("figure");
            const img3 = elHtml.imgElement(pic_chart2,"img","");

    figure3.appendChild(img3);
    container3.appendChild(figure3);

    figure2.appendChild(img2);
    figure1.appendChild(img1);
    div1.appendChild(span1);
    div1.appendChild(span2);
    div2.appendChild(figure1);

    container2.appendChild(div1);
    container2.appendChild(div2);
    container2.appendChild(figure2);

    container1.appendChild(container2);
    container1.appendChild(container3);
    
    return container1.outerHTML;
}
