import { derived, readable, writable } from "svelte/store";

const lessonPlans = writable([]);
const robot = writable("");
const experience = writable("");
const topic = writable("");
const filteredLessonPlans = derived([lessonPlans, robot, experience, topic], ([$lessonPlans, $robot, $experience, $topic]) => {
    return $lessonPlans.filter(lessonPlan => {
        if (($robot === "" || lessonPlan.robot === $robot) && ($experience === "" || lessonPlan.experience === $experience) && ($topic === "" || lessonPlan.topic === $topic)) {
            return true;
        }

        return false;
    });
});

const perPage = readable(10);
const pageCount = derived([filteredLessonPlans, perPage], ([$filteredLessonPlans, $perPage]) => Math.ceil($filteredLessonPlans.length / $perPage));
const pages = derived([pageCount, perPage], ([$pageCount, $perPage]) => {
    let pages = [];

    for (let i = 1; i <= $pageCount; i++) {
        pages.push((i - 1) * $perPage);
    }

    return pages;
});

export {
    lessonPlans, filteredLessonPlans, perPage, pageCount, pages, robot, experience, topic
};
