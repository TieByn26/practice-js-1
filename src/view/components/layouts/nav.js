import { NavList } from "../elements";

export class navigation{
    constructor(){
        this.container = document.createElement("nav");
        this.container.className = "nav-container";
        const navlist = new NavList();
        this.container.appendChild(navlist.render());
        console.log("reload navigation");
    }   
    render(){
        return this.container;
    }
}