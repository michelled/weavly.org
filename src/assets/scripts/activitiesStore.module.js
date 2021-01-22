import { derived, writable } from "svelte/store";

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
const pageCount = derived(filteredActivities, $filteredActivities => Math.ceil($filteredActivities.length / 10));
const pages = derived(pageCount, $pageCount => {
    let pages = [];

    for (let i = 1; i <= $pageCount; i++) {
        pages.push((i - 1) * 10);
    }

    return pages;
});

export {
    activities, filteredActivities, pageCount, pages, type, experience, subject
};
