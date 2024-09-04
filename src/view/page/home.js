import { button, tabchevron } from "../components";
import { ic_plus, ic_calendar } from "@/constants";
export class home {
    constructor() {
        
    }
    chevron(){
        const container1 = document.createElement("div");
        container1.className = "home-container-chevron";
        
        const container2 = document.createElement("div");
        container2.className = "home-container-chevron_left";
        container2.innerHTML = new tabchevron().render();
        
        const container3  = document.createElement("div");
        container3.className = "home-container-chevron_right";
        container3.innerHTML = new button().render("button-white",{to: "#", label: "Select Dates", icon: ic_calendar});
        container3.innerHTML += new button().render("button-blue",{to: "#", label: "Add Product", icon: ic_plus});

        container1.appendChild(container2);
        container1.appendChild(container3);

        return container1;
    }
    mainMethod(){
        const container = document.createElement("div");
        container.className = "home-container";
        container.appendChild(this.chevron());

        return container;
    }
    render(){
        return this.mainMethod().outerHTML;
    }
}