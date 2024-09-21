export const navActive = ({ icon = '', icon2 = '', to = '', label = '' } = {}) => {
    const prPath = window.location.pathname;
    const active = () => {
        if (to === prPath){
            icon = icon2;
            return `nav-link-active`;
        }
        return ``;
    }
    const navClass = `nav-link ${active()}`.trim();
    const a = document.createElement("a");
    a.className = navClass;

    const img = document.createElement("img");
    img.src = icon;
    img.alt = "icon";

    const span = document.createElement("span");
    span.textContent = label;

    a.appendChild(img);
    a.appendChild(span);

    return a.outerHTML;
}
    