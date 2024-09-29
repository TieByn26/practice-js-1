import { elementHtml } from "@/utils";
import { ic_plus, ic_calendar } from "@/constants";
import { button, tabchevron, saleProgressChart, statistics, cardList, headSelling,
    tableSelling, footSelling ,headSaleLocation
 } from "../components";

export class home {
    elHtml = new elementHtml();
    constructor() {

    }
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
        container.innerHTML = saleProgressChart();
        container.innerHTML += statistics();
        return container.outerHTML;
    }
    topSellingSale() {
        const container = this.elHtml.divELement("top-container");
        const leftContainer = this.elHtml.divELement("top-container_left");
        leftContainer.innerHTML += headSelling();
        leftContainer.innerHTML += tableSelling();
        leftContainer.innerHTML += footSelling();

        const rightContainer = this.elHtml.divELement("top-container_right");
        rightContainer.innerHTML += headSaleLocation();

        container.appendChild(leftContainer);
        container.appendChild(rightContainer);
        return container.outerHTML;
    }

    mainMethod() {
        const container = this.elHtml.divELement("home-container");
        container.appendChild(this.chevron());
        container.innerHTML += cardList();
        container.innerHTML += this.chart();
        container.innerHTML += this.topSellingSale();

        return container;
    }
    render() {
        return this.mainMethod().outerHTML;
    }
}