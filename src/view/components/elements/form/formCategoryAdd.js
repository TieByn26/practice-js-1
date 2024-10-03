import { pic_thumbnail_add } from "@/constants";
import { CategoryController } from "@/controllers";
import { elementHtml } from "@/utils";
import { router } from "@/routes";

const element = new elementHtml();
export class FormCategoryAdd {
    constructor(head) {
        this.container = element.divELement("categoryad-container-form");
        this.initForm(head);
    }
    initForm(head) {

        const img = element.imgElement(pic_thumbnail_add, "img", "");
        const mainForm = element.divELement("categoryad-container-form_main");
        const title = element.spanElement("title", "General Information");

        //div name for category
        const divName = element.divELement("categoryad-container-form_main-name");
        const spTitle = element.spanElement("", "Category Name");
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Type category name here. . .";
        input.value = "";
        divName.append(spTitle, input);
        //div description for category
        const divDes = element.divELement("categoryad-container-form_main-des");
        const spDtitle = element.spanElement("", "Description");
        const area = document.createElement("textarea");
        area.placeholder = "Type category description here. . .";
        area.value = "";
        divDes.append(spDtitle, area);

        mainForm.append(title, divName, divDes);
        this.container.append(img, mainForm);

        /**
         * add event to save and edit for category
         */
        const initialValues = [input.value,area.value];
        const button = head.querySelector(".categoryad-container-head_button .add-button");
        this.attachInputListeners(input, area, initialValues, button);
        this.createEventSave(input, area, button, initialValues);
    }
    /**
     * create event input
     * @param {*} input 
     * @param {*} area 
     * @param {*} initialValues 
     * @param {*} button 
     */
    attachInputListeners(input, area, initialValues, button) {

        const checkChanges = () => {
            if (input.value !== initialValues[0] && area.value !== initialValues[1]) {
                button.removeAttribute("unactive");
            } else {
                button.setAttribute("unactive", "true");
            }
        };

        input.addEventListener("input", checkChanges);
        area.addEventListener("input", checkChanges);
    }
    /**
     * create event to update category
     * @param {*} button 
     */
    createEventSave(input, area, button, initialValues) {
        button.addEventListener('click', async () => {
            if (!button.hasAttribute("unactive")) {
                const newCategoryData = {
                    name: input.value,
                    description: area.value,
                    sales: "4,901",
                    stock: 451,     
                    added: new Date().toLocaleDateString("en-GB", {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    })
                };
    
                try {
                    await CategoryController.addNewCategory(newCategoryData);
                    input.value = "";
                    area.value = "";
                    initialValues[0] = input.value;
                    initialValues[1] = area.value;
                    // Hiện thông báo thành công (toast)
                    button.setAttribute("unactive", "true");
                } catch (err) {
                    // Hiện thông báo lỗi (toast)
                    console.error("Error updating data", err);
                }
            }
        });
    }
    
    render() {
        return this.container;
    }
}