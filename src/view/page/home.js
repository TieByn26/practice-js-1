import { elementHtml } from "@/utils";
import { ic_plus, ic_calendar } from "@/constants";
import { button, tabchevron, saleProgressChart, statistics, 
    cardList, headSelling, footSelling, 
    headSaleLocation, tableContainer} from "../components";
import { saleLocationController } from "@/controllers";

export class home {
    elHtml = new elementHtml();

    constructor() {}

    createButton(className, to, label, icon) {
        return new button().render(className, { to, label, icon });
    }

    createDiv(className, ...children) {
        const div = this.elHtml.divELement(className);
        if (children.length) div.append(...children);
        return div;
    }

    /**
     * @returns {HTMLElement} container1
     */
    chevron() {
        const chevronLeft = this.createDiv("home-container-chevron_left", new tabchevron().render());
        const chevronRight = this.createDiv(
            "home-container-chevron_right",
            this.createButton("button-white", "#", "Select Dates", ic_calendar),
            this.createButton("button-blue", "#", "Add Product", ic_plus)
        );
        return this.createDiv("home-container-chevron", chevronLeft, chevronRight);
    }

    /**
     * @returns {HTMLElement} container
     */
    chart() {
        return this.createDiv("chart-container", saleProgressChart(), statistics());
    }

    /**
     * @returns {HTMLElement} container
     */
    topSellingSale() {
        const leftContainer = this.createDiv("top-container_left", headSelling(), tableContainer.tableSelling(), footSelling());
        const rightContainer = this.createDiv("top-container_right", headSaleLocation());

        this.appendPromiseData(tableContainer.handleDisPlayData(saleLocationController.getData()), rightContainer);
        return this.createDiv("top-container", leftContainer, rightContainer);
    }

    /**
     * Handle and append promise data to container
     * @param {Promise} promise 
     * @param {HTMLElement} container 
     */
    async appendPromiseData(promise, container) {
        const table = await promise;
        container.appendChild(table);
    }

    /**
     * @returns {HTMLElement} container
     */
    mainMethod() {
        return this.createDiv("home-container",this.chevron(), cardList(), this.chart(), this.topSellingSale());
    }

    /**
     * @returns {HTMLElement}
     */
    render() {
        console.log("load home");
        return this.mainMethod();
    }
}
