import { navigation, header, main } from '.';
import { elementHtml } from '@/utils';

export class rootLayout {
    elHtml = new elementHtml();

    constructor() {
        this.rootContainer = this.elHtml.divELement("root-container");
        this.nav = new navigation();
        this.nodeContainer = this.elHtml.divELement("node-container");
        
        this.headerContent = new header();
        this.mainContent = new main();

        this.initLayout();
    }

    /**
     * initialize the default layout structure
     */
    initLayout() {
        this.rootContainer.appendChild(this.nav.render());
        this.rootContainer.appendChild(this.nodeContainer);
        this.nodeContainer.append(this.headerContent.render(), this.mainContent.render());
    }

    /**
     * @param {HTMLElement} childNode 
     */
    render(childNode) {
        this.mainContent.container.replaceChildren(childNode);
        return this.rootContainer;
    }
}