import { elementHtml } from "@/utils";
import { FormCategory, HeadCategoryDetail } from "../components";

const element = new elementHtml();
export class categorydetail {
    constructor() {
        this.container = element.divELement("category-detail-container");
        this.initHead();
        this.initForm();
    }
    initHead(){
        const head = new HeadCategoryDetail().render();
        this.container.appendChild(head);
    }
    initForm(){
        const form = new FormCategory().render();
        this.container.appendChild(form);
    }
    render(){
        return this.container;
    }
}
