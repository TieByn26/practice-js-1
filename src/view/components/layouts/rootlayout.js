import { elementHtml } from '@/utils';
import {nav ,header ,main } from '.';

export class rootLayout {
    elHtml = new elementHtml();
    constructor() {
        this.rootContainer = this.elHtml.divELement("root-container");
        this.nodeContainer = this.elHtml.divELement("node-container");
    }
    initContent(){

    }

    render(){

    }
}

// export const rootlayout = () => {
//     return /*html*/`
//         <div class = "root-container">
//             ${nav()}
//             <div class = "node-container">
//                 ${new header().render()} 
//                 ${main()}
//             </div>
//         </div>
//     `;
// };