import { dtoMethod } from "../common/dtoMethod";

export class category extends dtoMethod{
    /**
     *
     * @param {object} param0
     * @param {number} param0.id
     * @param {string} param0.name
     * @param {string} param0.description
     * @param {number} param0.sales
     * @param {number} param0.stock
     * @param {string} param0.added
     */
    constructor({id, name, image, description, sales, stock, added}){
        super();
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.sales = sales;
        this.stock = stock;
        this.added = added;
    }
}
