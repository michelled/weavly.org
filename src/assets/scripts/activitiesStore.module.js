import { derived, writable } from "svelte/store";

const href = writable(window.location.href);

const URL = window.URL;

const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

const updateHref = () => href.set(window.location.href);

history.pushState = function () {
    originalPushState.apply(this, arguments);
    updateHref();
};

history.replaceState = function () {
    originalReplaceState.apply(this, arguments);
    updateHref();
};

window.addEventListener("popstate", updateHref);
window.addEventListener("hashchange", updateHref);

const url = {
    subscribe: derived(href, ($href) => new URL($href)).subscribe
};

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
    url, activities, filteredActivities, pageCount, pages, type, experience, subject
};
