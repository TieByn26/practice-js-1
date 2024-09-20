// import { routeComponents } from "@/constants";

// import { rootlayout } from "@/view";

// export class router {
//     constructor() {
//         document.addEventListener('click', this.clickNavlink.bind(this));
//         window.addEventListener('popstate', this.popState.bind(this));
//         this.navigate();
//     }
//     navigate() {
//         document.querySelector("#app").innerHTML = rootlayout();
//         document.querySelector(".main-container").innerHTML = 
//         routeComponents[window.location.pathname];
//     }
//     clickNavlink(event){
//         const target = event.target.closest(".nav-link");
//         if (target){
//             event.preventDefault();
//             const newPath = target.getAttribute("href");
//             window.history.pushState({}, "", newPath);
//             this.navigate();
//         }
//     }
//     popState(){
//         this.navigate();
//     }
// }
import { routes } from "./routes";
import { rootLayout } from "@/view";

export class router {
    constructor() {
        
        window.addEventListener("popstate", () => {
            window.dispatchEvent(new CustomEvent("urlChanged"));
        });
        window.addEventListener("urlChanged", () => {
            router.routeToMatchingComponent();
        });
        const url = window.location.pathname;
        router.pushState(url);
    }
    /**
     * 
     * @returns {object}
     */
    static getParam() {
        const urlPath = window.location.pathname;
        let [componentPath, params] = [null, null];

        for (const route1 of routes) {
            if (route1.children) {
                for (const route2 of route1.children) {
                    componentPath = `${route1.path}${route2.path}`;
                    if (router.correctPath(urlPath, componentPath)) {
                        params = router.extractParams(urlPath, componentPath);
                        return params;
                    }
                }
            } else {
                componentPath = route1.path;
                if (router.correctPath(urlPath, componentPath)) {
                    params = router.extractParams(urlPath, componentPath);
                    return params;
                }
            }
        }
    }
    /**
     * 
     * @param {String} url 
     * @param {String} path 
     * @returns {object}
     */
    static extractParams(url, path) {
        const urlSegments = url.split("/");
        const pathSegments = path.split("/");
        const params = {};

        for (let i = 0; i < pathSegments.length; i++) {
            if (pathSegments[i].startsWith(":")) {
                const key = pathSegments[i].slice(1);
                params[key] = urlSegments[i];
            }
        }
        return params;
    }
    /**
     * 
     * @returns {object}
     */
    static getRoutes() {
        let [childNode, componentPath, params] = [null, null, null];
        const urlPath = window.location.pathname;

        for (const route1 of routes) {
            if (route1.children) {
                for (const route2 of route1.children) {
                    componentPath = `${route1.path}${route2.path}`;
                    if (router.correctPath(urlPath, componentPath)) {
                        params = router.extractParams(urlPath, componentPath);

                        if (Object.keys(params).length !== 0) {
                            childNode = new route2.component().render();
                        } else {
                            childNode = new route2.component().render();
                        }
                        const componentMain = new route1.component().render(childNode);
                        childNode = componentMain;
                        
                        return { childNode, componentPath, params };
                    }
                }
            } else {
                componentPath = route1.path;
                if (router.correctPath(urlPath, componentPath)) {
                    childNode = route1.component.render();
                    console.log(childNode);
                    params = router.extractParams(urlPath, componentPath);
                    return { childNode, componentPath, params };
                }
            }
        }
        return { childNode, componentPath, params };
    }
    /**
     * 
     * @param {string} url 
     * @param {string} path 
     * @param {boolean} isEqualLenght 
     * @returns {boolean}
     */
    static correctPath(url, path, isEqualLenght = true) {
        const urlSegments = url.split("/");
        const pathSegments = path.split("/");

        if (urlSegments.length !== pathSegments.length && isEqualLenght) {
            return false;
        }
        const len = Math.min(urlSegments.length, pathSegments.length);

        for (let i = 0; i < len; i++) {
            if (urlSegments[i] !== pathSegments[i] && !pathSegments[i].startsWith(":")) {
                return false;
            }
        }
        return true;
    }
    /**
     * 
     * @returns {html}
     */
    static routeToMatchingComponent() {
        const app = document.querySelector("#app");
        const { childNode } = router.getRoutes();
        if (childNode) {
            app.replaceChildren(childNode);
            return;
        }
        const div = document.createElement("div");
        div.textContent = "Not Found";
        app.replaceChildren(div);
    }
    /**
     * 
     * @param {String} pathUrl 
     */
    static pushState(pathUrl) {
        window.history.pushState(null, null, pathUrl);  
        window.dispatchEvent(new CustomEvent("urlChanged"));
    }
}

