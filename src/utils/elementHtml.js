export class elementHtml{
    constructor(){

    }
    divELement(className){
        const div = document.createElement("div");
        div.className = className;

        return div;
    }
    aElement(className, href){
        const a = document.createElement("a");
        a.className = className;
        a.href = href;

        return a;
    }
    imgElement(src, alt, className = ""){
        const img = document.createElement("img");
        img.className = className;
        img.src = src;
        img.alt = alt;

        return img;
    }
    spanElement(className = "", content){
        const span = document.createElement("span");
        span.className = className;
        span.textContent = content;

        return span;
    }
    ulElement(className = ""){
        const ul = document.createElement("ul");
        ul.className = className;

        return ul;
    }
    liElement(className = ""){
        const li = document.createElement("li");
        li.className = className;

        return li;
    }
}
