import { el } from "../core/dom.js";
import { createSection, appendDescription, appendTags } from "./common.js";

export function renderProjects(container, navbar, data, imageConfig) {
    navbar.addGroup(data.navbar_group_projects);

    data.content_projects.forEach((item, index) => {
        const { section, header } = createSection(container, navbar, item, index);

        appendDescription(header, item.description);
        appendTags(header, item.tags);

        const blocks = el("div", "content-blocks");
        section.appendChild(blocks);
        item.blocks.forEach((block, i) => {
            blocks.appendChild(createBlock(block, i, imageConfig));
        });

        section.appendChild(createGithubLink(item.github, data.github_desc));
    });
}

// One image + text block. Odd blocks put the image on the right.
function createBlock(block, index, imageConfig) {
    const contentBlock = el("div", "content-block");
    const blockImage = createImage(block.image, imageConfig);
    const blockText = createText(block);

    if (index % 2 == 1) {
        blockImage.className = "block-image right";
        blockText.className = "block-text left";
        contentBlock.appendChild(blockText);
        contentBlock.appendChild(blockImage);
    } else {
        blockImage.className = "block-image left";
        blockText.className = "block-text right";
        contentBlock.appendChild(blockImage);
        contentBlock.appendChild(blockText);
    }

    return contentBlock;
}

function createImage(imageId, imageConfig) {
    const blockImage = el("div");
    const imageObject = imageConfig.images.find(img => img.id === imageId);

    const image = el("img", imageObject.image_pos);
    image.src = imageObject.image;
    image.loading = "lazy";
    blockImage.appendChild(image);

    return blockImage;
}

function createText(block) {
    const blockText = el("div");
    blockText.appendChild(el("h2", "", block.heading));

    // "--link--" in the text marks where the next entry of block.links goes.
    const parts = block.text.split("--link--");
    const textContent = el("div", "text-content");
    blockText.appendChild(textContent);

    parts.forEach((part, i) => {
        textContent.appendChild(el("span", "", part));

        if (i < parts.length - 1) {
            const link = el("a", "text-link", block.links[i].desc);
            link.href = block.links[i].link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            textContent.appendChild(link);
        }
    });

    return blockText;
}

function createGithubLink(url, text) {
    const row = el("div", "link-row");

    const link = el("a", "text-link", text);
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    row.appendChild(link);

    return row;
}
