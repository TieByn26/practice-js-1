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
    return /*html*/ `
        <a href="${to}" class="${navClass}">
            <img src="${icon}" alt="icon">
            <span>${label}</span>
        </a>
    `;
}

    
