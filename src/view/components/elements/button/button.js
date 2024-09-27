import { elementHtml } from "@/utils";
import { Link } from "../link";
export class button {
    constructor() {}
    elHtml = new elementHtml();

    buttonLink(to, label, icon) {
        const container = new Link(to).render();
        const img = this.elHtml.imgElement(icon, "icon");
        const span = this.elHtml.spanElement("",label);

        container.appendChild(img);
        container.appendChild(span);

        return container;
    }

    createButton({to = '', label = '',icon = '', className = '' } = {}) {
        const container = document.createElement("button");
        container.className = className;
        
        container.appendChild(this.buttonLink(to, label, icon));

        return container;
    }

    // buttonBlue(options = {}){
    //     return this.createButton({...options, className : "button-blue"});
    // }
    // buttonWhite(options = {}){
    //     return this.createButton({...options, className : "button-white"});
    // }
    // buttonMiddle(options = {}){
    //     return this.createButton({...options, className : "button-middle"});
    // }

    render(params, options = {}) {
        // const classMap = {
        //     blue: "button-blue",
        //     white: "button-white",
        //     middle: "button-middle"
        // };
        // const buttonClass = classMap[params];
        return this.createButton({...options, className: params});
    }
}
