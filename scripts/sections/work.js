import { el } from "../core/dom.js";
import { formatDateRange } from "../core/dates.js";
import { createSection, appendDescription, appendTags } from "./common.js";

export function renderWork(container, navbar, data) {
    navbar.addGroup(data.navbar_group_work);

    data.content_work.forEach((item, index) => {
        const { section, header } = createSection(container, navbar, item, index);

        appendDescription(header, item.description);
        appendDescription(header, formatDateRange(item) + "\n" + item.at + "\n" + item.company);
        appendTags(header, item.tech);

        section.appendChild(createTasks(item.tasks));
    });
}

function createTasks(tasks) {
    const tasksDiv = el("div", "tasks-div");

    tasks.forEach(task => {
        const taskDiv = el("div", "task-div");
        taskDiv.appendChild(el("span", "task-title", task.title + ": "));
        taskDiv.appendChild(el("span", "task-content", task.content));
        tasksDiv.appendChild(taskDiv);
    });

    return tasksDiv;
}
