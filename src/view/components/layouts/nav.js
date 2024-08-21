import { NavList } from "../elements";

export const nav = () => {
    const opj = new NavList();
    return /*html*/`
        <nav class = "nav-container">
            ${opj.render()}
        </nav>
    `;a
};
