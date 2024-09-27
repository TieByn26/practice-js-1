import { elementHtml } from "@/utils";
import { ic_plus, ic_calendar } from "@/constants";
import { button, tabchevron, saleProgressChart, 
    statistics, cardList, headSelling, headSaleLocation,
    tableContainer , footSelling, HeadRecentOrder, TableRecent, 
    FootRecent} from "../components";
import { saleLocationController, productController, OrderController } from "@/controllers";

export class home {
    elHtml = new elementHtml();

    constructor() {
        this.container = this.elHtml.divELement("home-container");
        this.chevron();
        this.container.appendChild(cardList());
        this.chart();
        this.topSellingSale();
        this.recentOrder();
    }

    chevron() {
        const container1 = this.elHtml.divELement("home-container-chevron");
        const container2 = this.elHtml.divELement("home-container-chevron_left");
        container2.appendChild(new tabchevron().render());

        const container3 = this.elHtml.divELement("home-container-chevron_right");
        container3.appendChild(new button().render("button-white", { to: "/404", label: "Select Dates", icon: ic_calendar }));
        container3.appendChild( new button().render("button-blue", { to: "/add-product", label: "Add Product", icon: ic_plus }));

        container1.appendChild(container2);
        container1.appendChild(container3);

        this.container.appendChild(container1);
    }

    chart() {
        const container1 = this.elHtml.divELement("chart-container");
        container1.appendChild(saleProgressChart());
        container1.appendChild(statistics());

        this.container.appendChild(container1);
    }

    topSellingSale() {
        const container1 = this.elHtml.divELement("top-container");
        const leftContainer = this.elHtml.divELement("top-container_left");
        leftContainer.appendChild(headSelling());
        this.handleDisPlayData(productController.getTopSelling()).then(data => {
            leftContainer.appendChild(tableContainer.tableSelling(data));
            leftContainer.appendChild(footSelling.creatFootSelling());
        })

        const rightContainer = this.elHtml.divELement("top-container_right");
        this.handleDisPlayData(saleLocationController.getData()).then(data =>{
            rightContainer.appendChild(headSaleLocation());
            rightContainer.appendChild(tableContainer.tableSaleLocation(data));
        });

        container1.appendChild(leftContainer);
        container1.appendChild(rightContainer);

        this.container.appendChild(container1);
    }
    async recentOrder(){
        const container1 = this.elHtml.divELement("recent-order-container");
        const headRecentOrder = HeadRecentOrder.render();
        container1.appendChild(headRecentOrder);
        const data = await this.handleDisPlayData(OrderController.getListOrder(1));
        
        if (data) {
            const table = await TableRecent.tableRecentOrder(data);
            container1.appendChild(table);
            container1.appendChild(FootRecent.createFootRecent());
        } else {
            console.log("No data found");
        }

        this.container.appendChild(container1);
    }
    /**
     * Handle get data
     * @param {data} data 
     * @returns {data}
     */
    async handleDisPlayData(data) {
        const obj = await data;
        return obj;
    };

    render() {
       return this.container;
    }
}