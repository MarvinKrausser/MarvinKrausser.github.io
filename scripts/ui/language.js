import { getCookie, setCookie } from "../core/cookies.js";

const SUPPORTED_LANGUAGES = ["en", "de"];

// Language from cookie, else browser language, else "en".
export function detectLanguage() {
    let lang = getCookie("lang");
    if (lang == null) {
        lang = navigator.language.split("-")[0];
    }
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
        lang = "en";
    }

    document.documentElement.lang = lang;
    return lang;
}

export function setupLanguageDropdown(lang, buttonId, menuId, dropdownId) {
    const button = document.getElementById(buttonId);
    const menu = document.getElementById(menuId);
    const dropdown = document.getElementById(dropdownId);
    const items = menu.querySelectorAll(".lang-item");

    button.textContent = lang;

    button.addEventListener("click", (e) => {
        e.stopPropagation();

        items.forEach(item => {
            item.classList.toggle("hidden", item.dataset.lang == lang);
        });

        menu.classList.toggle("hidden");
        dropdown.classList.toggle("show-border");
    });

    items.forEach(item => {
        item.addEventListener("click", () => {
            const lang_selected = item.dataset.lang;

            button.textContent = item.textContent;

            menu.classList.add("hidden");
            dropdown.classList.remove("show-border");

            items.forEach(el => el.classList.add("hidden"));

            setCookie("lang", lang_selected, "3600");
            location.reload();
        });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(`#${dropdownId}`)) {
            menu.classList.add("hidden");
            dropdown.classList.remove("show-border");
            items.forEach(el => el.classList.add("hidden"));
        }
    });
}
