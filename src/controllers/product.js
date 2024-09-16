import { endpointUrl } from "@/utils";
import { axiosApiGetData, axiosApiDeleteData, axiosApiUpdateData, axiosApiAddData } from "@/utils";
import { product, category, image} from "@/models";
export class productController{
    constructor(params) {
        
    }
    /**
     * 
     * @param {number} page
     * @return {Array} product[]
     */
    getDataFlPage(page, responseData = (product) => {
        return product;
    }){
        axiosApiGetData(endpointUrl.getTopSelling(page))
        .then(data => {
            /**@type {product[]}*/
            const products = data.map(res => {
                const categoryRes = new category();
                const productRes = new product(res);
                productRes.response();
                return productRes;
            })
            responseData(products);
        }).catch(err => {
            console.log(">>> err get data: ", err);
        })
    }
}
