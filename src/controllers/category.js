import { axiosApiAddData, axiosApiDeleteData, axiosApiGetData, axiosApiPatchData, endpointUrl } from "@/utils";
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
    static async getCategoryFollowId(id){
        try {
            const data  = await axiosApiGetData(endpointUrl.getCategory(id));
            const Category = new category(data);
            return Category;
        } catch (error) {
            console.error("Error fetching Category data:", error);
        }
    }
    static async deteteCategory(id){
        try {
            const deletee  = await axiosApiDeleteData(endpointUrl.getCategory(id));
        } catch (error) {
            console.error("Error delete category data:", error);
        }
    }
    static async updateCategory(id, data){
        try {
            await axiosApiPatchData(endpointUrl.getCategory(id), data);
        } catch (error) {
            console.error("Error update category data:", error)
        }
    }
    static async addNewCategory(data){
        try {
            await axiosApiAddData(endpointUrl.getCategories(), data);
        } catch (error) {
            console.error("Error add category data:", error)
        }
    }
    static async getAllCategory(){
        try {
            const data = await axiosApiGetData(endpointUrl.getCategories());
            const categories = data.map(res => {
                const Category = new category(res);
                return Category; 
            }); 
            return categories;
        } catch (err) {
            console.log("err fetch list category",err);
        }
    }
}
