import { elementHtml } from "@/utils";
export const navActive = ({ icon = '', icon2 = '', to = '', label = '' } = {}) => {
    const prPath = window.location.pathname;
    //check path
    const active = () => {
        if (to === prPath){
            icon = icon2;
            return `nav-link-active`;
        }
        return ``;
    }
    const navClass = `nav-link ${active()}`.trim();
    //create element
    const elHtml = new elementHtml();
    const a = elHtml.aElement(navClass,to);
    const img = elHtml.imgElement(icon,"icon","");
    const span = elHtml.spanElement("",label);

    a.appendChild(img);
    a.appendChild(span);

    return a.outerHTML;
}
    