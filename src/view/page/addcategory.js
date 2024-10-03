import { elementHtml } from "@/utils";
import { HeadCategoryAdd } from "../components";
import { FormCategoryAdd } from "../components";

const element = new elementHtml();
export class addcategory {
    constructor() {
        this.container = element.divELement("categoryad-container");
        this.initHeadForm();
    }
    initHeadForm() {
        const head = new HeadCategoryAdd().render();
        this.container.appendChild(head);
        const form = new FormCategoryAdd(head).render();
        this.container.appendChild(form);
    }
    render() {
        return this.container;
    }
}
