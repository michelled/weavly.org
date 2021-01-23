import { derived, readable, writable } from "svelte/store";

const activities = writable([]);
const type = writable("");
const experience = writable("");
const subject = writable("");
const filteredActivities = derived([activities, type, experience, subject], ([$activities, $type, $experience, $subject]) => {
    return $activities.filter(activity => {
        if (($type === "" || activity.type === $type) && ($experience === "" || activity.experience === $experience) && ($subject === "" || activity.subject === $subject)) {
            return true;
        }

        return false;
    });
});
const perPage = readable(10);
const pageCount = derived([filteredActivities, perPage], ([$filteredActivities, $perPage]) => Math.ceil($filteredActivities.length / $perPage));
const pages = derived([pageCount, perPage], ([$pageCount, $perPage]) => {
    let pages = [];

    for (let i = 1; i <= $pageCount; i++) {
        pages.push((i - 1) * $perPage);
    }

    return pages;
});

export {
    activities, filteredActivities, perPage, pageCount, pages, type, experience, subject
};
