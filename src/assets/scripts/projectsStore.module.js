import { derived, readable, writable } from "svelte/store";

const projects = writable([]);
const category = writable("All");
const filteredProjects = derived([projects, category], ([$projects, $category]) => {
    return $projects.filter(project => {
        return $category === "All" || project.category === $category;
    });
});
const filtered = derived(category, $category => $category !== "All");
const perPage = readable(10);
const pageCount = derived([filteredProjects, perPage], ([$filteredProjects, $perPage]) => Math.ceil($filteredProjects.length / $perPage));
const pages = derived([pageCount, perPage], ([$pageCount, $perPage]) => {
    let pages = [];

    for (let i = 1; i <= $pageCount; i++) {
        pages.push((i - 1) * $perPage);
    }

    return pages;
});

export {
    projects, filtered, filteredProjects, perPage, pageCount, pages, category
};
