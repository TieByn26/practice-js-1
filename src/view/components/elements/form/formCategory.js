import { elementHtml } from "@/utils"
import { pic_thumbnail_detail } from "@/constants"
import { CategoryController } from "@/controllers";
import { router } from "@/routes";

const element = new elementHtml();
export class FormCategory{
    constructor(){
        this.container = element.divELement("category-container-form");
        this.initForm();
    }
    /**
     * show form
     */
    async initForm(){
        const category = await CategoryController.getCategoryFollowId(router.getParam().categoryId);
        console.log(category);

        const img = element.imgElement(pic_thumbnail_detail,"img","");
        const mainForm = element.divELement("category-container-form_main");
        const title = element.spanElement("title","General Information");

        //div name for category
        const divName = element.divELement("category-container-form_main-name");
        const spTitle = element.spanElement("","Category Name");
        const input = document.createElement("input");
        input.type = "text";
        input.value = `${category.name}`;
        divName.append(spTitle, input);
        //div description for category
        const divDes = element.divELement("category-container-form_main-des");
        const spDtitle = element.spanElement("","Description");
        const area = document.createElement("textarea");
        area.value = `${category.description}`;
        divDes.append(spDtitle, area);

        mainForm.append(title, divName, divDes);
        this.container.append(img, mainForm);

        /**
         * add event to save and edit for category
         */
        const initialValues = [input.value, area.value];
        const button = document.querySelector(".categoryde-head-container_button .save-button");
        this.attachInputListeners(input, area, initialValues, button);
        this.createEventSave(input, area ,button, initialValues);
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
            if (input.value !== initialValues[0] || area.value !== initialValues[1]) {
                button.removeAttribute("unactive");
            } else {
                button.setAttribute("unactive","true");
            }
        };

        input.addEventListener("input", checkChanges);
        area.addEventListener("input", checkChanges);
    }
    /**
     * create event to update category
     * @param {*} button 
     */
    createEventSave(input, area, button, initialValues){
        button.addEventListener('click', async () => {
            if (!button.hasAttribute("unactive")) {
                const newCategoryData = {
                    name: input.value,
                    description: area.value
                };

                try {
                    await CategoryController.updateCategory(router.getParam().categoryId, newCategoryData);
                    initialValues[0] = input.value;
                    initialValues[1] = area.value;
                    //show toast
                    button.setAttribute("unactive","true");
                } catch (err) {
                    //show toast
                    console.error("err update data", err);
                }
            }
        });
    }
    render(){
        return this.container;
    }
}
