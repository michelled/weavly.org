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
const pageCount = derived(activities, $activities => Math.ceil($activities.length / 10));

export {
    url, activities, pageCount, type, experience, subject
};
