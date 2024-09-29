import { endpointUrl } from "@/utils";
import { axiosApiGetData, axiosApiPatchData } from "@/utils";
import { Orders } from "@/models";
export class OrderController{
    constructor(){

    }
    /**
     * Get list order with limit for 1 page = 10 atribute in array
     * @param {number} page 
     * @returns {Array}
     */
    static async getListOrder(page){
        try {
            const data = await axiosApiGetData(endpointUrl.getListOrder(page));
            const orders = data.map(res => {
                const order = new Orders(res);
                return order;
            });
            return orders;
        } catch (error) {
            console.error("Error fetching list order data:", error);
        }
    }
    /**
     * Get order follow id 
     * @param {number} id 
     * @returns {object}
     */
    static async getOrderFollowId(id){
        try {
            const data = await axiosApiGetData(endpointUrl.getOrder(id));
            const orderFollowId = new Orders(data);
            return orderFollowId;
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    }
    /**
     * patch data follow id
     * @param {number} id 
     * @param {object} data 
     */
    static async updateStatus(id,data){
        try {
            await axiosApiPatchData(endpointUrl.getOrder(id), data);
        } catch (error) {
            console.error("Error update order data:", error)
        }
    }
}
