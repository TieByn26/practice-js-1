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
    async getDataFlPage(page, responseData = (products) => {}) {
        try {
            const data = await axiosApiGetData(endpointUrl.getTopSelling(page));
            const products = data.map(res => {
                const categoryRes = new category();
                const productRes = new product(res);
                productRes.response();
                return productRes;
            });
            responseData(products);
        } catch (err) {
            console.log(">>> err get data: ", err);
        }
    }

    async getDetail(productId, responseData = (product) => {}) {
        try {
            const data = await axiosApiGetData(endpointUrl.getProductDetail(productId));
            const productRes = new product(data);
            productRes.response();
            responseData(productRes);
        } catch (err) {
            console.log(">>> err get detail: ", err);
        }
    }

    async addProduct(productData) {
        try {
            await axiosApiAddData(endpointUrl.addProduct(), productData);
            console.log("finish");
        } catch (err) {
            console.log(">>> err add product: ", err);
        }
    }
}