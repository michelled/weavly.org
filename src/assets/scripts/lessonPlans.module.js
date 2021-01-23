import LessonPlans from "./LessonPlans.svelte";

const lessonPlans = new LessonPlans({
    target: document.getElementById("lesson-plans"),
    props: {}
});

window.lessonPlans = lessonPlans;

export default lessonPlans;
