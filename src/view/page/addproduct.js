import { elementHtml } from "@/utils";
import { FootProductDetail, FormAddProduct, HeadAddProduct } from "../components";

const element = new elementHtml();
export class addproduct {
    constructor() {
        this.superContainer = element.divELement("super-container");
        this.container = element.divELement("productde-container");
        const foot = new FootProductDetail().render();
        this.iniForm(foot);
        this.superContainer.append(this.container, foot);
    }
    async iniForm(foot){
        const head = new HeadAddProduct().render();
        this.container.appendChild(head);
        const container = element.divELement("productde-form-container");
        const forml = new FormAddProduct(head, foot).render();
        const formr = await FormAddProduct.rightColumn();
        container.append(forml, formr);
        this.container.appendChild(container);
    }
    render(){
        return this.superContainer;
    }
}
