import { loadContent, loadImageConfig } from "./core/data.js";
import { detectLanguage, setupLanguageDropdown } from "./ui/language.js";
import { setupThemeToggle } from "./ui/theme.js";
import { createNavbar, setupMobileNavbar, hideMobileNavbar } from "./ui/navbar.js";
import { setupScrollRestoration, restoreScroll, setupScrollSpy } from "./ui/scroll.js";
import { renderSidebarTop } from "./sections/sidebar.js";
import { renderIntroduction } from "./sections/introduction.js";
import { renderWork } from "./sections/work.js";
import { renderProjects } from "./sections/projects.js";

const lang = detectLanguage();

// Each control exists twice: sidebar (desktop) and mobile bar.
setupThemeToggle("themeToggle", ["themeToggle2"]);
setupThemeToggle("themeToggle2", ["themeToggle"]);
setupLanguageDropdown(lang, "lang-button", "lang-menu", "lang-dropdown");
setupLanguageDropdown(lang, "lang-button2", "lang-menu2", "lang-dropdown2");

setupScrollRestoration();

async function init() {
    const data = await loadContent(lang);
    const imageConfig = await loadImageConfig();

    document.getElementById("website_title").textContent = data.title_website;

    setupMobileNavbar();
    const navbar = createNavbar();
    const container = document.getElementById("projects-section");

    renderSidebarTop(data);
    renderIntroduction(data, navbar);
    renderWork(container, navbar, data);
    renderProjects(container, navbar, data, imageConfig);

    restoreScroll();
    setupScrollSpy();
    hideMobileNavbar();
}

init();
