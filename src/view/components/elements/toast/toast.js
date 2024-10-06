import { elementHtml } from "@/utils";
import {  ic_cross } from "@/constants";

const element = new elementHtml();
export class Toast {

    static toastShow(className,icon,title,message){
        const toastM = element.divELement(className);
        const iconn = element.imgElement(icon,"icon","")
        const divContent = element.divELement("");
        const spanTitle = element.spanElement("",title);
        const spanMessage = element.spanElement("",message);
        divContent.append(spanTitle, spanMessage);
        const cancel = element.imgElement(ic_cross,"icon","cancel-icon");
        toastM.append(iconn, divContent, cancel);

        setTimeout(()=>{
            toastM.style.right = "30px";
        }, 100);

        cancel.addEventListener('click', () => {
            setTimeout(() => {
                toastM.style.right = "-300px"; 
                setTimeout(() => {
                    toastM.remove();
                }, 500);
            }, 30);
        });

        setTimeout(() => {
            toastM.style.right = "-300px"; 
            setTimeout(() => {
                toastM.remove();
            }, 500);
        }, 3000);
        document.body.appendChild(toastM);
    }
}