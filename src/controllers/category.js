import { axiosApiDeleteData, axiosApiGetData, endpointUrl } from "@/utils";
import { category } from "@/models";

export class CategoryController{
    constructor(){

    }
    /**
     * 
     * @param {number} page 
     * @returns {Array}
     */
    static async getListCategory(page){
        try {
            const data = await axiosApiGetData(endpointUrl.getListCategory(page));
            const categories = data.map(res => {
                const Category = new category(res);
                return Category; 
            }); 
            return categories;
        } catch (err) {
            console.log("err fetch list category",err);
        }
    }
    static async deteteCategory(id){
        try {
            const deletee  = await axiosApiDeleteData(endpointUrl.getCategory(id));
        } catch (error) {
            console.error("Error delete category data:", error);
        }
    }
}
