import Projects from "./Projects.svelte";

const projects = new Projects({
    target: document.getElementById("projects"),
    props: {}
});

window.projects = projects;

export default projects;
