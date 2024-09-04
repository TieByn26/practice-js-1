export class button {
    constructor() {}

    buttonLink(to, label, icon) {
        const container = document.createElement("a");
        container.href = to;

        const img = document.createElement("img");
        img.src = icon;
        img.alt = "icon";

        const span = document.createElement("span");
        span.textContent = label;

        container.appendChild(img);
        container.appendChild(span);

        return container;
    }

    createButton({to = '', label = '',icon = '', className = '' } = {}) {
        const container = document.createElement("button");
        container.className = className;
        
        container.appendChild(this.buttonLink(to, label, icon));

        return container;
    }

    // buttonBlue(options = {}){
    //     return this.createButton({...options, className : "button-blue"});
    // }
    // buttonWhite(options = {}){
    //     return this.createButton({...options, className : "button-white"});
    // }
    // buttonMiddle(options = {}){
    //     return this.createButton({...options, className : "button-middle"});
    // }

    render(params, options = {}) {
        // const classMap = {
        //     blue: "button-blue",
        //     white: "button-white",
        //     middle: "button-middle"
        // };
        // const buttonClass = classMap[params];
        return this.createButton({...options, className: params}).outerHTML;
    }
}
