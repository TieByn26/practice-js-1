import { elementHtml } from "@/utils";
export const card = ({src = "", alt = "", name = "", sale = "", grow = {}} ={} ) =>{
    const elHtml = new elementHtml();
    //create element
    const container1 = elHtml.divELement("card-container_list-item");
    const figure = document.createElement("figure");
    const img = elHtml.imgElement(src,alt,"");
    const container2 = elHtml.divELement("");
    const span1 = elHtml.spanElement("",name);
    const container3 = elHtml.divELement("");
    const span2 = elHtml.spanElement("sale",sale);
    const span3 = elHtml.spanElement("grow",grow);
    
    figure.appendChild(img);
    container3.append(span2, span3);
    container2.append(span1, container3);
    container1.append(figure, container2);

    return container1;
}
