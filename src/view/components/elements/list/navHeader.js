import {
    ic_menu, ic_search, ic_calendar, ic_notification,
    ic_envelope_menu, ic_gray, ic_chevron, ic_avatar
} from "@/constants";

export class NavHeader {
    list = [
        this.navHeaderLink(ic_search),
        this.navHeaderLink(ic_calendar),
        this.navHeaderLink(ic_notification),
        this.navHeaderLink(ic_envelope_menu),
        this.navHeaderLink(ic_gray)
    ];

    constructor() {
        
    }
    navHeaderLink(icon){
        const a = document.createElement("a");
        a.href = "#";

        const img = document.createElement("img");
        img.src = icon;
        img.alt = "icon";

        a.appendChild(img);

        return a.outerHTML;
    };
    

    navList() {
        const ul = document.createElement("ul");
        this.list.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = item;
            ul.appendChild(li);
        });
        return ul;
    }

    manager() {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = ic_avatar;
        img.alt = "icon";
        figure.appendChild(img);

        const div = document.createElement("div");

        const spanName = document.createElement("span");
        spanName.className = "span-name";
        spanName.textContent = "Jay Hargudson";

        const spanPosition = document.createElement("span");
        spanPosition.className = "span-position";
        spanPosition.textContent = "Manager";

        div.appendChild(spanName);
        div.appendChild(spanPosition);

        const chevron = document.createElement("div");
        chevron.innerHTML = this.navHeaderLink(ic_chevron);

        const container = document.createElement("div");
        container.className = "container-admin";
        container.appendChild(figure);
        container.appendChild(div);
        container.appendChild(chevron);

        return container;
    }

    header() {
        // nav-header_menu
        const divContainer1 = document.createElement("div");
        divContainer1.className = "nav-header_menu";
        divContainer1.innerHTML = this.navHeaderLink(ic_menu);

        // nav-header_container
        const divContainer2 = document.createElement("div");
        divContainer2.className = "nav-header_container";

        // nav-header_container-leftmenu
        const divContainer3 = document.createElement("div");
        divContainer3.className = "nav-header_container-leftmenu";
        divContainer3.appendChild(this.navList());

        // nav-header_container-rightmenu
        const divContainer4 = document.createElement("div");
        divContainer4.className = "nav-header_container-rightmenu";
        divContainer4.appendChild(this.manager());

        divContainer2.appendChild(divContainer3);
        divContainer2.appendChild(divContainer4);

        // Append all to a container div and return it
        const navTop = document.createElement("div");
        navTop.className = "nav-header-top";
        navTop.appendChild(divContainer1);
        navTop.appendChild(divContainer2);

        return navTop;
    }

    render() {
        return this.header().outerHTML;
    }
}
