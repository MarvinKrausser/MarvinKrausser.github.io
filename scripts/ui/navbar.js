import { el } from "../core/dom.js";

const navbarMobile = () => document.getElementById("navbar-mobile");
const openButton = () => document.getElementById("button-mobile");

// Mobile bar: open/close buttons and closing on outside click.
export function setupMobileNavbar() {
    const navbar = navbarMobile();
    const button = openButton();
    const links = document.getElementById("navbar-mobile-links");

    const toggle = () => {
        navbar.classList.toggle("inactive");
        button.classList.toggle("inactive");
    };

    document.addEventListener("click", (e) => {
        if (!e.target.closest("#navbar-mobile") && !e.target.closest("#button-mobile") && !navbar.classList.contains("inactive")) {
            navbar.classList.add("inactive");
            button.classList.remove("inactive");
        }
    });

    const closeButton = el("button", "button-mobile navbar", "");
    links.appendChild(closeButton);
    closeButton.addEventListener("click", toggle);

    button.textContent = "";
    button.addEventListener("click", toggle);
}

export function hideMobileNavbar() {
    navbarMobile().classList.add("inactive");
}

// Desktop sidebar navigation and mobile bar links, filled together.
export function createNavbar() {
    const desktop = document.getElementById("navbar");
    const mobile = document.getElementById("navbar-mobile-links");

    return {
        addGroup(title) {
            desktop.appendChild(el("li", "navbar-group", title));
        },

        addEntry(title, id, index) {
            addDesktopEntry(desktop, title, id, index);
            addMobileEntry(mobile, title, id);
        }
    };
}

function addDesktopEntry(navbar, title, id, index) {
    const item = el("li", "navbar-item");
    navbar.appendChild(item);

    const link = el("a", "nav-link");
    link.href = `#${id}`;
    link.dataset.target = id;
    item.appendChild(link);

    link.appendChild(el("span", "idx", String(index).padStart(2, "0") + "   "));
    link.appendChild(document.createTextNode(title));
}

function addMobileEntry(navbar, title, id) {
    const item = el("li", "navbar-item-mobile");
    navbar.appendChild(item);

    const link = el("a", "nav-link-mobile", title);
    link.href = `#${id}`;
    item.appendChild(link);
}
