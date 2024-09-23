import { dtoMethod } from "../common/dtoMethod";
import { category, image } from ".";

export const productType = {
    id: 0,
    sku: "",
    name: "",
    variant: "",
    quantity: 0,
    price: "",
    sales: 0,
    amount: "",
    status: "",
    added: "",
    description: "",
    categoryId: 0,
    imageId: 0
}
export const productRequestType = {
    sku: "",
    name: "",
    variant: "",
    quantity: 0,
    price: "",
    sales: 0,
    amount: "",
    status: "",
    added: "",
    description: "",
    categoryId: 0,
    imageId: 0
}
/**
 * @param {object} param0
 * @param {typeof productRequestType} param0
 * @returns {typeof productRequestType}
 */
export const getProductRequest = ({
    sku, name, variant, quantity, price, sales, amount, status, added, description, categoryId, imageId
}) => {
    return {
        sku, name, variant, quantity, price, sales, amount, status, added, description, categoryId, imageId
    };
}

export class product extends dtoMethod {
    /**
     * 
     * @param {object} param0 
     * @param {typeof productType} param0
     */
    constructor({ id, sku, name, variant, quantity, price, sales, amount, status, added, description, categoryId, imageId }) {
        super();
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.variant = variant;
        this.quantity = quantity;
        this.price = price;
        this.sales = sales;
        this.amount = amount;
        this.status = status;
        this.added = added;
        this.description = description;
        this.categoryId = categoryId;
        this.imageId = imageId;
    }
    /**
        * Sets category and image information for the product.
        * @param {object} params - Contains category and image information.
        * @param {Category} params.category - Category object.
        * @param {Image} params.image - Image object.
        */
    response({ category, image }) {
        this.category = category;
        this.image = image;
    }

    /**
     * Gets the data for the product request.
     * @returns {typeof productRequestType}
     */
    getDataForRequest() {
        return {
            sku: this.sku,
            name: this.name,
            variant: this.variant,
            quantity: this.quantity,
            price: this.price,
            sales : this.sales,
            amount: this.amount,
            status: this.status,
            added: this.added,
            description: this.description,
            categoryId: this.categoryId,
            imageId: this.imageId
        }
    }
}
