import { elementHtml } from "@/utils";
import { ic_plus, ic_calendar, icon_success, icon_error } from "@/constants";
import { button, tabchevron, saleProgressChart, 
    statistics, cardList, headSelling, headSaleLocation,
    tableContainer , footSelling, HeadRecentOrder, TableRecent, 
    FootRecent} from "../components";
import { saleLocationController, productController, OrderController, CustomerController } from "@/controllers";


export class home {
    elHtml = new elementHtml();

    constructor() {
        this.container = this.elHtml.divELement("home-container");
        this.chevron();
        this.container.appendChild(cardList());
        this.chart();
        this.handleData();
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

    topSellingSale(topSelling, saleLocation) {
        const container1 = this.elHtml.divELement("top-container");
        const leftContainer = this.elHtml.divELement("top-container_left");
        leftContainer.appendChild(headSelling());
        leftContainer.appendChild(tableContainer.tableSelling(topSelling));
        const foot = new footSelling(topSelling);
        leftContainer.appendChild(foot.render());

        const rightContainer = this.elHtml.divELement("top-container_right");
        rightContainer.appendChild(headSaleLocation());
        rightContainer.appendChild(tableContainer.tableSaleLocation(saleLocation));
        container1.appendChild(leftContainer);
        container1.appendChild(rightContainer);

        this.container.appendChild(container1);
    }
    recentOrder(orders, customers){
        const container1 = this.elHtml.divELement("recent-order-container");
        const headRecentOrder = HeadRecentOrder.render();
        container1.appendChild(headRecentOrder);
        const table = new TableRecent(orders, customers).render();
        const foot = new FootRecent(orders, customers).render();
        container1.appendChild(table);
        container1.appendChild(foot);
        this.container.appendChild(container1);
    }
    async handleData() {
        const saleLocation = await saleLocationController.getData();
        const topSelling = await productController.getTopSelling();
        const orders = await OrderController.getAllOrder();
        const customers = await CustomerController.getAllCustomer();
        this.topSellingSale(topSelling, saleLocation);
        this.recentOrder(orders, customers);
    };


    render() {
       return this.container;
    }
}