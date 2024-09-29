import { routes } from "./routes";

export class router {
    constructor() {
        window.addEventListener("popstate", () => window.dispatchEvent(new CustomEvent("urlChanged")));
        window.addEventListener("urlChanged", router.routeToMatchingComponent);
        /**
         * web start
         */
        router.pushState(window.location.pathname);
    }

    /**
     * get params from the current URL
     * @returns {object|null}
     */
    static getParam() {
        const urlPath = window.location.pathname;
        for (const route of router.getFlattenedRoutes()) {
            const { path } = route;
            if (router.correctPath(urlPath, path)) {
                return router.extractParams(urlPath, path);
            }
        }
        return null;
    }

    /**
     * retrieve all routes (including child routes)
     * @returns {Array}
     */
    static getFlattenedRoutes() {
        return routes.flatMap(route => route.children ? route.children.map(child => ({ ...child, parentComponent: route.component })) : [route]);
    }

    /**
     * ẽtract params from URL and corresponding path
     * @param {String} url 
     * @param {String} path 
     * @returns {object}
     */
    static extractParams(url, path) {
        const urlSegments = url.split("/");
        const pathSegments = path.split("/");
        return pathSegments.reduce((params, segment, i) => {
            if (segment.startsWith(":")) {
                params[segment.slice(1)] = urlSegments[i];
            }
            return params;
        }, {});
    }

    /**
     * get the component and render it based on the current URL
     * @returns {object}
     */
    static getRoutes() {
        const urlPath = window.location.pathname;
        for (const route of router.getFlattenedRoutes()) {
            const { path, component, parentComponent } = route;
            if (router.correctPath(urlPath, path)) {
                const params = router.extractParams(urlPath, path);
                const childNode = new component().render();
                if (parentComponent) {
                    return { childNode: new parentComponent().render(childNode), path, params };
                }
                return { childNode, path, params };
            }
        }
        return { childNode: null, path: null, params: null };
    }

    /**
     * check if the URL matches the routes path
     * @param {string} url 
     * @param {string} path 
     * @param {boolean} isEqualLength 
     * @returns {boolean}
     */
    static correctPath(url, path, isEqualLength = true) {
        const urlSegments = url.split("/");
        const pathSegments = path.split("/");
        
        if (isEqualLength && urlSegments.length !== pathSegments.length) return false;

        return pathSegments.every((segment, i) => segment.startsWith(":") || segment === urlSegments[i]);
    }

    /**
     * navigate to the component that matches the current URL
     */
    static routeToMatchingComponent() {
        const app = document.querySelector("#app");
        const { childNode } = router.getRoutes();
        app.replaceChildren(childNode || router.createNotFoundComponent());
    }

    /**
     * create a "404" component when no matching route is found
     * @returns {HTMLElement}
     */
    static createNotFoundComponent() {
        const div = document.createElement("div");
        div.className = "notfound-page";
        const img = document.createElement("img");
        img.src = "https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1880.jpg?w=740&t=st=1726988079~exp=1726988679~hmac=1a8c363360a589080d27afddf4fe8f9e2f0f0d8b8d7bb51af5043f2b1772f176";
        div.appendChild(img);
        return div;
    }

    /**
     * change the URL and dispatch the urlChanged event
     * @param {String} pathUrl 
     */
    static pushState(pathUrl) {
        window.history.pushState(null, null, pathUrl);
        window.dispatchEvent(new CustomEvent("urlChanged"));
    }
}