import { routeComponents } from "@/constants";

import { rootlayout } from "@/view";

export class router {
    constructor() {
        document.addEventListener('click', this.clickNavlink.bind(this));
        window.addEventListener('popstate', this.popState.bind(this));
        this.navigate();
    }
    navigate() {
        document.querySelector("#app").innerHTML = rootlayout();
        document.querySelector(".main-container").innerHTML = 
        routeComponents[window.location.pathname];
    }
    clickNavlink(event){
        const target = event.target.closest(".nav-link");
        if (target){
            event.preventDefault();
            const newPath = target.getAttribute("href");
            window.history.pushState({}, "", newPath);
            this.navigate();
        }
    }
    popState(){
        this.navigate();
    }
}

