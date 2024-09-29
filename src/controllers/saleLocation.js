import { topSale } from "@/models";
import { endpointUrl } from "@/utils";
import { axiosApiGetData } from "@/utils";
export class saleLocationController {
    constructor() {

    }
    getData(getdata = (topSales) => { 
        return topSales; 
    }) {
        axiosApiGetData(endpointUrl.getTopSale())
            .then((data) => {
                if (Array.isArray(data)) {
                    /** @type {topsale[]} */
                    const topSales = data.map((res) => {
                        const topSaleResponse = new topSale(res);
                        return topSaleResponse;
                    });
                    getdata(topSales);
                } else {
                    console.error("Data is not an array:", data);
                }
            })
            .catch((error) => {
                console.error("Error fetching top sales:", error);
            });
    }
    
}
