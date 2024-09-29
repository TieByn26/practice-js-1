import {navigation ,header ,main } from '.';
import { elementHtml } from '@/utils';

export class rootLayout {
    elHtml = new elementHtml();
    constructor() {
        this.rootContainer = this.elHtml.divELement("root-container");
        this.nav = new navigation();
        this.initContent();
        console.log("reload nav root");
    }
    /**
     * create layout default
     */
    initContent(){
        // const nav = new navigation();
        this.rootContainer.appendChild(this.nav.render());
        /** content container */
        this.nodeContainer = this.elHtml.divELement("node-container");
        this.rootContainer.appendChild(this.nodeContainer);
        /** content component */
        this.headerContent = new header();
        this.mainContent = new main();
        // this.nodeContainer.appendChild(this.headerContent.render());
        // this.nodeContainer.appendChild(this.mainContent.render());
        this.nodeContainer.append(this.headerContent.render(), this.mainContent.render());
        // this.mainContent.container.replaceChildren("dm");
    }

    render(childNode){
        this.mainContent.container.replaceChildren(childNode);
        // this.nodeContainer.innerHTML += this.mainContent.render();
        return this.rootContainer;
    }
}