import { el } from "../core/dom.js";

export function renderIntroduction(data, navbar) {
    const introduction = document.getElementById("introduction");

    introduction.appendChild(el("h1", "", data.title_introduction));
    introduction.appendChild(el("p", "", data.content_introduction));

    const githubLink = el("a", "text-link introduction", "GitHub ↗");
    githubLink.href = "https://github.com/marvinkrausser";
    githubLink.target = "_blank";
    githubLink.rel = "noopener noreferrer";
    introduction.appendChild(githubLink);

    navbar.addEntry(data.title_introduction, "introduction", 0);
}
