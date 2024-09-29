import {nav ,header ,main } from '.';

export const rootlayout = () => {
    return /*html*/`
        <div class = "root-container">
            ${nav()}
            <div class = "node-container">
                ${new header().render()} 
                ${main()}
            </div>
        </div>
    `;
};
