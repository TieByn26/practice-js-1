import { ic_chevron_down, ic_dollar, pic_media_de } from "@/constants";
import { CategoryController, productController } from "@/controllers";
import { router } from "@/routes";
import { elementHtml } from "@/utils";

const element = new elementHtml();

export class FormProductDetail {
    constructor() {
        this.container = element.divELement("left-column-form");
        this.handleData();

    }

    information(data) {
        const product = data;
        const mainForm = element.divELement("left-column-form_infor");
        const title = element.spanElement("title", "General Information");

        // div name for category
        const divName = element.divELement("left-column-form_infor-name");
        const spTitle = element.spanElement("", "Category Name");
        const input = document.createElement("input");
        input.className = "input-name";
        input.type = "text";
        input.value = product.name;
        divName.append(spTitle, input);

        // div description for category
        const divDes = element.divELement("left-column-form_infor-des");
        const spDtitle = element.spanElement("", "Description");
        const area = document.createElement("textarea");
        area.className = "input-description";
        area.value = product.description;
        divDes.append(spDtitle, area);

        mainForm.append(title, divName, divDes);
        this.container.appendChild(mainForm);
        const initialValues = {
            inputs: [input.value, area.value],
        };

        // attach listeners to check for changes
        const button1 = document.querySelector(".productde-container-foot_button .save-button");
        const button2 = document.querySelector(".save-button");
        this.attachInputListeners([input, area], [], initialValues, button1, button2);
    }

    media() {
        const img = element.imgElement(pic_media_de, "img", "");
        this.container.appendChild(img);
    }

    pricing(data) {
        const product = data;
        const mainForm = element.divELement("left-column-form_pricing");
        const title = element.spanElement("title", "Pricing");

        // div price
        const divPrice = element.divELement("left-column-form_pricing-price");
        const spTitle = element.spanElement("", "Base Price");
        const divInput1 = element.divELement("div-input");
        const inputPrice = document.createElement("input");
        inputPrice.className ="input-price";
        inputPrice.type = "text";
        inputPrice.value = product.price.replace("$", "");
        const img = element.imgElement(ic_dollar, "icon", "");
        divInput1.append(img, inputPrice);

        divPrice.append(spTitle, divInput1);

        // div middle
        const imgChev = element.imgElement(ic_chevron_down, "icon", "");
        const divMidlle = element.divELement("left-column-form_pricing-midlle");

        const divType = element.divELement("left-column-form_pricing-midlle_type");
        const divInput2 = element.divELement("div-input");
        const spanType = element.spanElement("", "Discount Type");
        const inputType = document.createElement("input");
        inputType.className = "input-type";
        inputType.value = "No Discount";
        divInput2.append(inputType, imgChev);
        divType.append(spanType, divInput2);

        const divPrecentage = element.divELement("left-column-form_pricing-midlle_precentage");
        const divInput3 = element.divELement("div-input");
        const spanPrecentage = element.spanElement("", "Discount Percentage (%)");
        const inputPrecentage = document.createElement("input");
        inputPrecentage.value = "0%";
        divInput3.append(inputPrecentage, imgChev);
        divPrecentage.append(spanPrecentage, divInput3);

        // div inventory
        const imgChevvv = element.imgElement(ic_chevron_down, "icon", "");
        const divInventory = element.divELement("left-column-form_pricing-midlle");

        const divClass = element.divELement("left-column-form_pricing-midlle_type");
        const divInput4 = element.divELement("div-input");
        const spanClass = element.spanElement("", "Tax Class");
        const inputClass = document.createElement("input");
        inputClass.value = "Tax Free";
        divInput4.append(inputClass, imgChevvv);
        divClass.append(spanClass, divInput4);

        const divVat = element.divELement("left-column-form_pricing-midlle_precentage");
        const divInput5 = element.divELement("div-input");
        const spanVat = element.spanElement("", "VAT Amount (%)");
        const inputVat = document.createElement("input");
        inputVat.value = "0%";
        divInput5.append(inputVat, imgChevvv);
        divVat.append(spanVat, divInput5);

        divInventory.append(divClass, divVat);
        divMidlle.append(divType, divPrecentage);
        mainForm.append(title, divPrice, divMidlle, divInventory);
        this.container.appendChild(mainForm);

        const initialValues = {
            inputs: [inputPrice.value],
        };

        // attach listeners to check for changes
        const button1 = document.querySelector(".productde-container-foot_button .save-button");
        const button2 = document.querySelector(".save-button");
        this.attachInputListeners([inputPrice], [], initialValues, button1, button2);
    }

    inventory(data) {
        const product = data;
        const mainForm = element.divELement("left-column-form_inventory");
        const title = element.spanElement("title", "Inventory");
        const div = element.divELement("div-row");

        // div sku
        const divSku = element.divELement("left-column-form_inventory-sku");
        const spSku = element.spanElement("", "SKU");
        const input1 = document.createElement("input");
        input1.className = "input-sku";
        input1.type = "text";
        input1.value = product.sku;
        divSku.append(spSku, input1);

        // div barcode
        const divBar = element.divELement("left-column-form_inventory-sku");
        const spBar = element.spanElement("", "Barcode");
        const input2 = document.createElement("input");
        input2.className = "input-barcode";
        input2.type = "text";
        input2.value = product.barcode;
        divBar.append(spBar, input2);

        // div quantity
        const divQuantity = element.divELement("left-column-form_inventory-sku");
        const spQuantity = element.spanElement("", "Quantity");
        const input3 = document.createElement("input");
        input3.className = "input-quantity";
        input3.type = "text";
        input3.value = product.quantity;
        divQuantity.append(spQuantity, input3);

        div.append(divSku, divBar, divQuantity);
        mainForm.append(title, div);
        this.container.appendChild(mainForm);

        const initialValues = {
            inputs: [input1.value, input2.value, input3.value],
        };

        // attach listeners to check for changes
        const button1 = document.querySelector(".productde-container-foot_button .save-button");
        const button2 = document.querySelector(".save-button");
        this.attachInputListeners([input1, input2, input3], [], initialValues, button1, button2);
    }

    static async rightColumn() {
        const container = element.divELement("right-column-form");
        const category = async () => {
            const categoryCon = element.divELement("right-column-form_category");
            const title = element.spanElement("title", "Category");
            const divCate = element.divELement("div-cate");
            const spanCate = element.spanElement("", "Product Category");
            const dropdown = document.createElement("select");
            dropdown.className = "dropdown-category";

            const defaultOption = document.createElement("option");
            const cateProduct = await CategoryController.getCategoryFollowId(router.getParam().productId);
            defaultOption.textContent = cateProduct.name;
            defaultOption.value = cateProduct.id;
            defaultOption.disabled = true;
            defaultOption.selected = true;
            dropdown.appendChild(defaultOption);

            const categories = await CategoryController.getListCategory();
            categories.forEach((category) => {
                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;
                dropdown.appendChild(option);
            });
            divCate.append(spanCate, dropdown);

            const divTag = element.divELement("div-cate");
            const spanTag = element.spanElement("", "Product Tags");
            const drop = document.createElement("select");

            const defaultOpt = document.createElement("option");
            defaultOpt.textContent = "Example Tag";
            defaultOpt.disabled = true;
            defaultOpt.selected = true;
            drop.appendChild(defaultOpt);
            divTag.append(spanTag, drop);

            categoryCon.append(title, divCate, divTag);
            return categoryCon;
        };

        const status = async () => {
            const categoryCon = element.divELement("right-column-form_category");
            const divTitle = element.divELement("div-title");
            const title = element.spanElement("title", "Status");
            const product = await productController.getProductFollowId(router.getParam().productId);
            const statusClass =
                product.status.startsWith("D") ? "draft-status" :
                product.status.startsWith("L") ? "low-stock-status" :
                product.status.startsWith("P") ? "published-status" : "out-of-stock-status";

            const statusSpan = element.spanElement(statusClass, product.status);
            divTitle.append(title, statusSpan);

            const divCate = element.divELement("div-cate");
            const spanCate = element.spanElement("", "Product Status");
            const dropdown = document.createElement("select");
            dropdown.className = "dropdown-status";

            const defaultOption = document.createElement("option");
            defaultOption.textContent = product.status;
            defaultOption.disabled = true;
            defaultOption.selected = true;
            dropdown.appendChild(defaultOption);

            const itemStatus = ["Draft", "Low Stock", "Published", "Out of Stock"];
            itemStatus.forEach((item) => {
                const option = document.createElement("option");
                option.value = item;
                option.textContent = item;
                dropdown.appendChild(option);
            });
            divCate.append(spanCate, dropdown);
            categoryCon.append(divTitle, divCate);
            return categoryCon;
        };

        container.append(await category(), await status());
        return container;
    }

    // function to attach listeners to all inputs and dropdowns
    attachInputListeners(inputs, dropdowns, initialValues, button1, button2) {
        const checkChanges = () => {
            let hasChanges = false;

            // check all inputs
            inputs.forEach((input, index) => {
                if (input.value !== initialValues.inputs[index]) {
                    hasChanges = true;
                }
            });

            // check all dropdowns
            dropdowns.forEach((dropdown, index) => {
                if (dropdown.value !== initialValues.dropdowns[index]) {
                    hasChanges = true;
                }
            });

            if (hasChanges) {
                button1.removeAttribute("unactive");
            } else {
                button1.setAttribute("unactive", "true");
            }
            if (hasChanges) {
                button2.removeAttribute("unactive");
            } else {
                button2.setAttribute("unactive", "true");
            }
            this.createEventSave(button1);
            this.createEventSave(button2);
        };

        // attach listeners to all inputs
        inputs.forEach((input) => {
            input.addEventListener("input", checkChanges);
        });

        // attach listeners to all dropdowns
        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener("change", checkChanges);
        });
    }

    async handleData() {
        const data = await productController.getProductFollowId(router.getParam().productId);
        this.information(data);
        this.media();
        this.pricing(data);
        this.inventory(data);
    }

    /**
     * @param {HTMLElement} button 
     */
    createEventSave(button) {
        button.addEventListener('click', async () => {
            if (!button.hasAttribute("unactive")) {
                const productId = router.getParam().productId;
                
                const nameInput = this.container.querySelector('.input-name');
                const descriptionArea = this.container.querySelector('.input-description');
                const priceInput = this.container.querySelector('.input-price');
                const skuInput = this.container.querySelector('.input-sku');
                const barcodeInput = this.container.querySelector('.input-barcode');
                const quantityInput = this.container.querySelector('.input-quantity');
                const statusSelect = document.querySelector('.dropdown-status');
                const categorySelect = document.querySelector('.dropdown-category');

                const newProductData = {
                    sku: skuInput.value,
                    name: nameInput.value,
                    price: '$' + priceInput.value,
                    status: statusSelect.value,
                    description: descriptionArea.value,
                    quantity: parseInt(quantityInput.value),
                    categoryId: parseInt(categorySelect.value),
                    barcode: barcodeInput.value
                };

                try {
                    await productController.updateProduct(productId, newProductData);
                    
                    this.updateInitialValues(newProductData);
                    button.setAttribute("unactive", "true");
                    
                    console.log(newProductData);
                    this.showToast("duoc", "success");
                } catch (err) {
                    this.showToast("loi", "error");
                    console.error("loi", err);
                }
            }
        });
    }

    updateInitialValues(newData) {
        const inputs = this.container.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const name = input.name || input.id;
            if (newData[name] !== undefined) {
                input.value = newData[name];
            }
        });
    }

    showToast(message, type) {
        console.log(`${type.toUpperCase()}: ${message}`);
    }

    render() {
        return this.container;
    }
}