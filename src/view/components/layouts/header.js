import { NavHeader } from "../elements";
export class header {
    constructor(){

    }
    headerLayout(){
        const header = document.createElement("header");
        const nav = document.createElement("nav");
        nav.className = "nav-header";
        nav.innerHTML = new NavHeader().render();
        header.appendChild(nav);

        return header;
    }

    render(){
        return this.headerLayout().outerHTML;
}
