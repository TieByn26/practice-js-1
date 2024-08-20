import { routeComponents } from "@/constants";

export const navigate = () => {
    const path = window.location.pathname;
    const components = routeComponents[path];
    const main_component = document.querySelector(".main-container");
    main_component.innerHTML() = components;
};