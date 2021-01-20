import Activities from "./Activities.svelte";

const activities = new Activities({
    target: document.getElementById("activities"),
    props: {}
});

window.activities = activities;

export default activities;
