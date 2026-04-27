let lang = getCookie("lang");
if (lang == null) {
    lang = navigator.language.split("-")[0];
}
if (lang != "en" && lang != "de") {
    lang = "en";
}
history.scrollRestoration = "manual";

function saveScroll() {
    sessionStorage.setItem("scrollY", window.scrollY);
}

function restoreScroll() {
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY !== null) {

        document.documentElement.style.scrollBehavior = "auto";

        window.scrollTo(0, parseInt(scrollY));

        document.documentElement.style.scrollBehavior = "smooth";
    }
}

window.addEventListener("beforeunload", saveScroll);

function setupObserver() {
    const sections = document.querySelectorAll("[data-nav]");
    const navLinks = document.querySelectorAll(".nav-link");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.dataset.target === entry.target.id
                    );
                });

            }
        });
    }, {
        threshold: 0,
        rootMargin: "0px 0px -80% 0px"
    });

    sections.forEach(section => observer.observe(section));
}

async function loadData() {
    const response = await fetch(`./lang/${lang}.json`);
    const image_response = await fetch(`./config/img_config.json`)
    const image_config = await image_response.json()
    const data = await response.json();

    const website_title = document.getElementById("website_title");
    website_title.textContent = data.title_website;

    const introduction = document.getElementById("introduction");
    const container = document.getElementById("projects-section");
    const navbar = document.getElementById("navbar");
    const sidebar_top = document.getElementById("sidebar-top-content");

    const sidebar_top_status = document.createElement("p");
    sidebar_top_status.textContent = data.status;
    sidebar_top.appendChild(sidebar_top_status);

    const sidebar_top_profession = document.createElement("p");
    sidebar_top_profession.textContent = data.profession;
    sidebar_top.appendChild(sidebar_top_profession);

    const sidebar_top_workplace = document.createElement("p");
    sidebar_top_workplace.textContent = data.workplace;
    sidebar_top.appendChild(sidebar_top_workplace);

    const headline_introduction = document.createElement("h1");
    headline_introduction.textContent = data.title_introduction;
    introduction.appendChild(headline_introduction);

    const content_introduction = document.createElement("p");
    content_introduction.textContent = data.content_introduction;
    introduction.appendChild(content_introduction);

    const github_link_introduction = document.createElement("a");
    github_link_introduction.textContent = "GitHub ↗"
    github_link_introduction.className = "text-link introduction";
    github_link_introduction.href = "https://github.com/marvinkrausser";
    github_link_introduction.target = "_blank";
    github_link_introduction.rel = "noopener noreferrer";
    introduction.appendChild(github_link_introduction);

    create_navbar_entry(navbar, data.title_introduction, "introduction", 0);

    const navbar_group = document.createElement("li");
    navbar_group.className = "navbar-group";
    navbar_group.textContent = data.navbar_group
    navbar.appendChild(navbar_group);


    data.content.forEach((item, j) => {
        const project = document.createElement("section");
        project.className = "project-section";
        project.id = item.id;
        project.setAttribute("data-nav", item.id);
        container.appendChild(project);

        create_navbar_entry(navbar, item.title, item.id, j + 1);

        const header = document.createElement("div");
        header.className = "section-header";
        project.appendChild(header);

        const headerTitle = document.createElement("h1");
        headerTitle.className = "section-title";
        headerTitle.textContent = item.title;
        header.appendChild(headerTitle);

        const headerDesc = document.createElement("p");
        headerDesc.className = "section-desc";
        headerDesc.textContent = item.description;
        header.appendChild(headerDesc);

        const tags = document.createElement("div");
        tags.className = "tags";
        header.appendChild(tags);

        item.tags.forEach(tag_json => {
            const tag = document.createElement("span");
            tag.className = "tag";
            tag.textContent = tag_json;
            tags.appendChild(tag);
        });

        const content_blocks = document.createElement("div");
        content_blocks.className = "content-blocks";
        project.appendChild(content_blocks);

        item.blocks.forEach((content, i) => {
            const content_block = document.createElement("div");
            content_block.className = "content-block";
            content_blocks.appendChild(content_block);

            const block_image = document.createElement("div");

            const image = document.createElement("img");
            const image_id = content.image;
            const image_object = image_config.images.find(img => img.id === image_id);
            image.className = image_object.image_pos;
            image.src = image_object.image;
            image.loading = "lazy";
            block_image.appendChild(image);

            const block_text = document.createElement("div");

            const text_title = document.createElement("h2");
            text_title.textContent = content.heading;
            block_text.appendChild(text_title);

            const parts = content.text.split("--link--");
            const text_content = document.createElement("div");
            text_content.className = "text-content";
            block_text.appendChild(text_content);

            parts.forEach((part, i) => {
                const text = document.createElement("span");
                text.textContent = part;
                text_content.appendChild(text);

                if (i < parts.length - 1) {
                    const link_list = content.links;
                    const a = document.createElement("a");
                    a.href = link_list[i].link;
                    a.textContent = link_list[i].desc;
                    a.target = "_blank";
                    a.rel = "noopener noreferrer";
                    a.className = "text-link";

                    text_content.appendChild(a);
                }
            });

            if (i % 2 == 1) {
                block_image.className = "block-image right";
                block_text.className = "block-text left";
                content_block.appendChild(block_text);
                content_block.appendChild(block_image);
            } else {
                block_image.className = "block-image left";
                block_text.className = "block-text right";
                content_block.appendChild(block_image);
                content_block.appendChild(block_text);
            }
        });

        const github_link = document.createElement("div");
        github_link.className = "link-row";
        project.appendChild(github_link);

        const link = document.createElement("a");
        link.href = item.github;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "text-link";
        link.textContent = data.github_desc;
        github_link.appendChild(link);
    });
    restoreScroll();
    setupObserver();
}

loadData();

const button = document.getElementById("lang-button");
const menu = document.getElementById("lang-menu");
const items = document.querySelectorAll(".lang-item");
const dropdown = document.getElementById("lang-dropdown");

button.textContent = lang;

button.addEventListener("click", () => {
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
        items.forEach(element => {
            element.classList.add("hidden");
        });

        setCookie("lang", lang_selected, "3600");
        location.reload();
    });
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".lang-dropdown")) {
        menu.classList.add("hidden");
        dropdown.classList.remove("show-border");
        items.forEach(element => {
            element.classList.add("hidden");
        });
    }
});

function create_navbar_entry(navbar, title, id, j) {
    const navbar_item = document.createElement("li");
    navbar_item.className = "navbar-item";
    navbar.appendChild(navbar_item);

    const navbar_link = document.createElement("a");
    navbar_link.className = "nav-link";
    navbar_link.href = `#${id}`;

    const idx = document.createElement("span");
    idx.className = "idx";
    idx.textContent = String(j).padStart(2, "0") + "\u00A0\u00A0\u00A0";
    navbar_link.appendChild(idx);

    const text = document.createTextNode(title);
    navbar_link.appendChild(text);
    navbar_link.dataset.target = id;
    navbar_item.appendChild(navbar_link);
}

function setCookie(name, value, maxAge) {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");

    for (let c of cookies) {
        const [key, value] = c.split("=");
        if (key === name) return value;
    }

    return null;
}

const toggle = document.getElementById("themeToggle");

toggle.addEventListener("change", () => {
    document.documentElement.classList.toggle("dark", toggle.checked);
    if (toggle.checked) {
        setCookie("theme", "dark", 60 * 60 * 24 * 7);
    }
    else {
        setCookie("theme", "light", 60 * 60 * 24 * 7);
    }

});

const theme = getCookie("theme");

if (theme === "dark") {
    document.documentElement.classList.add("dark");
    toggle.checked = true;
}