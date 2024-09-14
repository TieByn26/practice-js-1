import { navHeaderLink } from "./navHeaderLink";
import {
    ic_menu, ic_search, ic_calendar, ic_notification,
    ic_envelope_menu, ic_gray, ic_chevron, ic_avatar
} from "@/constants";

export class NavHeader {
    list = [
        navHeaderLink(ic_search),
        navHeaderLink(ic_calendar),
        navHeaderLink(ic_notification),
        navHeaderLink(ic_envelope_menu),
        navHeaderLink(ic_gray)
    ];

    constructor() {
        
    }

    navList() {
        return /*html*/`
            <ul>
                ${this.list.map(item => (
            `<li>${item}</li>`
        )).join('')} 
            </ul>
        `;
    }

    manager() {
        return /*html*/`
            <figure>
                <img src="${ic_avatar}" alt="icon">
            </figure>
            <div>
                <span class="span-name">Jay Hargudson</span>
                <span class="span-position">Manager</span>
            </div>
            ${navHeaderLink(ic_chevron)}
        `;
    }

    headerTop() {
        //nav-header_menu
        const divContainer1 = document.createElement("div");
        divContainer1.className = "nav-header_menu";
        divContainer1.innerHTML = navHeaderLink(ic_menu);

        //nav-header_container 
        const divContainer2 = document.createElement("div");
        divContainer2.className = "nav-header_container";

        //nav-header_container-leftmenu
        const divContainer3 = document.createElement("div");
        divContainer3.className = "nav-header_container-leftmenu";
        divContainer3.innerHTML = this.navList();

        //nav-header_container-rightmenu
        const divContainer4 = document.createElement("div");
        divContainer4.className = "nav-header_container-rightmenu";
        divContainer4.innerHTML = this.manager();

        divContainer2.appendChild(divContainer3);
        divContainer2.appendChild(divContainer4);

        // Append all to a container div and return it
        const navTop = document.createElement("div");
        navTop.className = "nav-header-top"
        navTop.appendChild(divContainer1);
        navTop.appendChild(divContainer2);

        return navTop;
    }

    render() {
        return this.headerTop().outerHTML;
    }
}
