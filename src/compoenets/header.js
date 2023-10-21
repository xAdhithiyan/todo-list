import elFactory from "../createDomElements"
import pfpImage from "/images/pfp.jpg"
import "../css/header.css"

const header = function(){
    let header = document.querySelector(".header")
    
    header.appendChild(elFactory("div", {}, "To Do List"));
    header.appendChild(elFactory("img", {src: pfpImage}, ""));
}

export default header;