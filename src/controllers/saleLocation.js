import { topSale } from "@/models";
import { endpointUrl } from "@/utils";
import { axiosApiGetData } from "@/utils";
export class saleLocationController {
    constructor() {

    }
    /**
     * 
     * @param {callback} callback 
     */
    static async getData() {
        try {
            const data = await axiosApiGetData(endpointUrl.getTopSale());
            if (Array.isArray(data)) {
                const topSales = data.map((item) => new topSale(item));
                return topSales;
            } else {
                console.error("Unexpected response: Data is not an array", data);
            }
        } catch (error) {
            console.error("Error fetching top sales data:", error);
        }
    } 
    
}
