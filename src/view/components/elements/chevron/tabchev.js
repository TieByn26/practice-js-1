import { elementHtml } from "@/utils";
export class tabchevron {
    constructor() {
        this.list = [
            this.tabActive(`/`, `All Time`),
            this.tabActive(`#`, `12 Months`),
            this.tabActive(`#`, `30 Days`),
            this.tabActive(`#`, `7 Days`),
            this.tabActive(`#`, `24 Hour`),
        ];
    }
    elHtml = new elementHtml();
    tabActive(to, text) {
        const activeClass = (to === "/") ? "tab-link-active" : "";
        const tabClass = `tab-link ${activeClass}`.trim();

        const li = this.elHtml.liElement(tabClass);
        const a = this.elHtml.aElement("",to);
        const span = this.elHtml.spanElement("",text);

        a.appendChild(span);
        li.appendChild(a);

        return li;
    }

    tabList() {
        const ul = document.createElement("ul");
        ul.className = "nav-header-bottom_ul";

        this.list.forEach(item => {
            ul.appendChild(item); 
        });

        return ul;
    }

    render() {
        return this.tabList();
    }
}
