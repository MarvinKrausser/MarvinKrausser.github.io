import { el } from "../core/dom.js";

// Status / profession / workplace lines below the name.
export function renderSidebarTop(data) {
    const content = document.getElementById("sidebar-top-content");

    content.appendChild(el("p", "", data.status));
    content.appendChild(el("p", "", data.profession));
    content.appendChild(el("p", "", data.workplace));
}
