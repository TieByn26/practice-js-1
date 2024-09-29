import { elementHtml } from "@/utils";
import { ic_plus, ic_calendar } from "@/constants";
import { button, tabchevron, saleProgressChart, statistics, cardList, headSelling, tableSelling, footSelling, headSaleLocation } from "../components";

export class home {
    elHtml = new elementHtml();

    constructor() {}

    chevron() {
        const container1 = this.elHtml.divELement("home-container-chevron");
        const container2 = this.elHtml.divELement("home-container-chevron_left");
        container2.innerHTML = new tabchevron().render();

        const container3 = this.elHtml.divELement("home-container-chevron_right");
        container3.innerHTML = new button().render("button-white", { to: "#", label: "Select Dates", icon: ic_calendar });
        container3.innerHTML += new button().render("button-blue", { to: "#", label: "Add Product", icon: ic_plus });

        container1.appendChild(container2);
        container1.appendChild(container3);

        return container1;
    }

    chart() {
        const container = this.elHtml.divELement("chart-container");
        const chartHtml = saleProgressChart();
        const statsHtml = statistics();
        
        container.innerHTML = chartHtml + statsHtml;

        return container;
    }

    topSellingSale() {
        const container = this.elHtml.divELement("top-container");
        const leftContainer = this.elHtml.divELement("top-container_left");

        leftContainer.innerHTML = headSelling() + tableSelling() + footSelling();

        const rightContainer = this.elHtml.divELement("top-container_right");
        rightContainer.innerHTML = headSaleLocation();

        container.appendChild(leftContainer);
        container.appendChild(rightContainer);

        return container;
    }

    mainMethod() {
        const container = this.elHtml.divELement("home-container");
        
        container.appendChild(this.chevron());
        container.innerHTML += cardList();
        container.appendChild(this.chart());
        container.appendChild(this.topSellingSale());

        return container;
    }

    render() {
        const output = this.mainMethod();
        console.log("load home");
        return output;
    }
}