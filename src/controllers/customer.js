import { endpointUrl } from "@/utils";
import { axiosApiGetData , axiosApiDeleteData} from "@/utils";
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
            console.error("Error fetching list customer data:", error);
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
            console.error("Error fetching customer data:", error);
        }
    }
    static async deleteCustomer(id) {
        try {
            const deletee  = await axiosApiDeleteData(endpointUrl.getCustomer(id));
        } catch (error) {
            console.error("Error delete customer data:", error);
        }
    }
}
