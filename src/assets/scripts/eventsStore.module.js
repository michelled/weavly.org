import { derived, readable, writable } from "svelte/store";

const events = writable([]);
const category = writable("All");
const filteredEvents = derived([events, category], ([$events, $category]) => {
    return $events.filter(event => {
        return $category === "All" || event.category === $category;
    });
});
const filtered = derived(category, $category => $category !== "All");
const perPage = readable(10);
const pageCount = derived([filteredEvents, perPage], ([$filteredEvents, $perPage]) => Math.ceil($filteredEvents.length / $perPage));
const pages = derived([pageCount, perPage], ([$pageCount, $perPage]) => {
    let pages = [];

    for (let i = 1; i <= $pageCount; i++) {
        pages.push((i - 1) * $perPage);
    }

    return pages;
});

export {
    events, filtered, filteredEvents, perPage, pageCount, pages, category
};
