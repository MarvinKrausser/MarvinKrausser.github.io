import { el } from "../core/dom.js";

// Shared skeleton of work and project sections: <section> + header with title,
// plus the matching navbar entry.
export function createSection(container, navbar, item, index) {
    const section = el("section", "project-section");
    section.id = item.id;
    section.setAttribute("data-nav", item.id);
    container.appendChild(section);

    navbar.addEntry(item.title, item.id, index + 1);

    const header = el("div", "section-header");
    section.appendChild(header);
    header.appendChild(el("h1", "section-title", item.title));

    return { section, header };
}

export function appendDescription(header, text) {
    header.appendChild(el("p", "section-desc", text));
}

export function appendTags(header, tags) {
    const tagList = el("div", "tags");
    header.appendChild(tagList);

    tags.forEach(tag => {
        tagList.appendChild(el("span", "tag", tag));
    });
}
