import { endpointUrl } from "@/utils";
import { axiosApiGetData, axiosApiDeleteData, axiosApiUpdateData, axiosApiAddData } from "@/utils";
import { product, category } from "@/models";

export class productController {
    constructor(params) {}

    /**
     * 
     * @param {pageNumber} page 
     * @param {callback} responseData 
     */
    static async getTopSelling(page) {
        try {
            const data = await axiosApiGetData(endpointUrl.getTopSelling(page));
            const products = data.map(res => {
                const productRes = new product(res);
                return productRes;
            });
            return products;
        } catch (err) {
            console.log(">>> err get data: ", err);
        }
    }
}
