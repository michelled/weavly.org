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

const type = writable("");
const experience = writable("");
const subject = writable("");

export {
    url, type, experience, subject
};
