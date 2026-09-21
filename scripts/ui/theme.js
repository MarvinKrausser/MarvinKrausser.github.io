import { getCookie, setCookie } from "../core/cookies.js";

const THEME_MAX_AGE = 60 * 60 * 24 * 7;

// Wires a dark-mode toggle and keeps the other toggles (sidebar / mobile bar) in sync.
export function setupThemeToggle(toggleId, otherToggleIds) {
    const toggle = document.getElementById(toggleId);
    const otherToggles = otherToggleIds.map(id => document.getElementById(id));

    toggle.addEventListener("change", () => {
        document.documentElement.classList.toggle("dark", toggle.checked);
        setCookie("theme", toggle.checked ? "dark" : "light", THEME_MAX_AGE);
        otherToggles.forEach(other => {
            other.checked = toggle.checked;
        });
    });

    if (getCookie("theme") === "dark") {
        document.documentElement.classList.add("dark");
        toggle.checked = true;
    }
}
