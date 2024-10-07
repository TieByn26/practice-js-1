import { axiosApiPatchData, endpointUrl } from "@/utils";
import { axiosApiGetData, axiosApiDeleteData, axiosApiUpdateData, axiosApiAddData } from "@/utils";
import { product, category} from "@/models";

export class productController {
    constructor(params) {}

    /**
     * 
     * @param {pageNumber} page 
     * @param {callback} responseData 
     */
    static async getTopSelling() {
        try {
            const data = await axiosApiGetData(endpointUrl.getTopSelling());
            const products = data.map(res => {
                const productRes = new product(res);
                return productRes;
            });
            return products;
        } catch (err) {
            console.log(">>> err get data: ", err);
        }
    }
    static async getProductFollowId(id){
        try {
            const data = await axiosApiGetData(endpointUrl.getProduct(id));
            const Product = new product(data);
            return Product;
        } catch (err) {
            console.log(">>> err get data: ", err);
        }
    }
    static async getListProduct(page){
        try {
            const data = await axiosApiGetData(endpointUrl.getListProduct(page));
            const products = data.map(res => {
                const Product = new product(res);
                return Product;
            });
            return products;
        } catch (error) {
            console.error("Error fetching list product data:", error);
        }
    }
    static async deleteProduct(id){
        try {
            const deletee  = await axiosApiDeleteData(endpointUrl.getProduct(id));
        } catch (error) {
            console.error("Error delete product data:", error);
        }
    }
    static async addNewProduct(data){
        try {
            await axiosApiAddData(endpointUrl.getProducts(), data);
        } catch (error) {
            console.error("Error add product data:", error)
        }
    }
    static async updateProduct(id, data){
        try {
            await axiosApiPatchData(endpointUrl.getProduct(id), data);
        } catch (error) {
            console.error("Error update product data:", error)
        }
    }
    static async getAllProduct(){
        try {
            const data = await axiosApiGetData(endpointUrl.getProducts());
            const products = data.map(res => {
                const Product = new product(res);
                return Product;
            });
            return products;
        } catch (error) {
            console.error("Error fetching list product data:", error);
        }
    }
}
