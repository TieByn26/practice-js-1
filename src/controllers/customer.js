import { endpointUrl } from "@/utils";
import { axiosApiGetData } from "@/utils";
import { Customer } from "@/models";
export class CustomerController{
    constructor(){

    }
    /**
     * 
     * @param {number} page 
     * @returns {object}
     */
    static async getListCustomer(page){
        try {
            const data = await axiosApiGetData(endpointUrl.getListCustomer(page));
            if (Array.isArray(data)) {
                const customers = data.map(data => {
                    console.log(data);
                    const customer = new Customer(data);
                    return customer;
                });
                return customers;
            } else {
                console.error("Unexpected response: Data is not an array", data);
            }
        } catch (error) {
            console.error("Error fetching list order data:", error);
        }
    }
    /**
     * 
     * @param {number} id 
     * @returns {object}
     */
    static async getCustomerFollowId(id) {
        try {
            const data  = await axiosApiGetData(endpointUrl.getCustomer(id));
            const customer = new Customer(data);
            return customer;
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    }
}
