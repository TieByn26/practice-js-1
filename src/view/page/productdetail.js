import { elementHtml } from "@/utils";
import { FormProductDetail, HeadProductDetail } from "../components";

const element = new elementHtml();
export class productdetail {
    constructor() {
        this.container = element.divELement("productde-container");
        this.initHead();
        this.iniForm();
    }
    initHead(){
        const head = new HeadProductDetail().render();
        this.container.appendChild(head);
    }
    async iniForm(){
        const container = element.divELement("productde-form-container");
        const forml = new FormProductDetail().render();
        const formr = await FormProductDetail.rightColumn();
        container.append(forml, formr);
        this.container.appendChild(container);
    }
    render(){
        return this.container;
    }
}
