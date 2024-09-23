import { elementHtml } from "@/utils";
import { ic_plus, ic_calendar } from "@/constants";
import { button, tabchevron, saleProgressChart, statistics, cardList, headSelling, headSaleLocation } from "../components";
import { tableContainer , footSelling} from "../components";
import { saleLocationController, productController } from "@/controllers";

export class home {
    elHtml = new elementHtml();

    constructor() {}

    chevron() {
        const container1 = this.elHtml.divELement("home-container-chevron");
        const container2 = this.elHtml.divELement("home-container-chevron_left");
        container2.appendChild(new tabchevron().render());

        const container3 = this.elHtml.divELement("home-container-chevron_right");
        container3.appendChild(new button().render("button-white", { to: "#", label: "Select Dates", icon: ic_calendar }));
        container3.appendChild( new button().render("button-blue", { to: "#", label: "Add Product", icon: ic_plus }));

        container1.appendChild(container2);
        container1.appendChild(container3);

        return container1;
    }

    chart() {
        const container = this.elHtml.divELement("chart-container");
        container.appendChild(saleProgressChart());
        container.appendChild(statistics());

        return container;
    }

    topSellingSale() {
        const container = this.elHtml.divELement("top-container");
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

        container.appendChild(leftContainer);
        container.appendChild(rightContainer);

        return container;
    }

    mainMethod() {
        const container = this.elHtml.divELement("home-container");
        
        container.appendChild(this.chevron());
        container.appendChild(cardList());
        container.appendChild(this.chart());
        container.appendChild(this.topSellingSale());

        return container;
    }
    //XU LY LAY DATA 
    async handleDisPlayData(data) {
        const obj = await data;
        return data;
    };

    render() {
        const output = this.mainMethod();
        return output;
    }
}