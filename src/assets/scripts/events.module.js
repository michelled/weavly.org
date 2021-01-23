import Events from "./Events.svelte";

const events = new Events({
    target: document.getElementById("events"),
    props: {}
});

window.events = events;

export default events;
