import { NavHeader } from "../elements/navHeader";
export class header {
    constructor(){

    }
    headerLayout(){
        return `
            <header>
                <nav class = "nav-header">
                    ${new NavHeader().render()}
                </nav>
            </header>
        `;
    }
    render(){
        return this.headerLayout();
    }
}
