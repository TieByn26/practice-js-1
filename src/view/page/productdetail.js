import { elementHtml } from "@/utils";
import { FootProductDetail, FormProductDetail, HeadProductDetail } from "../components";

const element = new elementHtml();
export class productdetail {
    constructor() {
        this.superContainer = element.divELement("super-container");
        this.container = element.divELement("productde-container");
        this.initHead();
        this.iniForm();
        const foot = new FootProductDetail().render();
        this.superContainer.append(this.container, foot);
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
        this.container.append(container);
    }
    render(){
        return this.superContainer;
    }
}
