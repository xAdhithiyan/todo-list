import github from  "/images/github.svg"
import "../css/footer.css"

function footer() {
    let mainFooter = document.querySelector(".footer")

    let div = document.createElement("div");
    div.textContent = "Made by Adhithiyan";
    mainFooter.appendChild(div);

    let anchor = document.createElement("a");
    anchor.setAttribute("href", "https://github.com/xAdhithiyan");
    anchor.setAttribute("target", "_blank");
    let img = document.createElement("img");
    img.setAttribute("src", github)

    anchor.appendChild(img)
    mainFooter.appendChild(anchor);
    return mainFooter;
}

export default footer;