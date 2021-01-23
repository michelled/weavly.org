<script>
    import { onMount } from 'svelte';

    import { lessonPlans, filteredLessonPlans, perPage, pageCount, pages, robot, experience, topic } from './lessonPlansStore.module.js'

    let robots = require("../../_data/lessonPlan-robots.json");
    let levels = require("../../_data/levels.json");
    let topics = require("../../_data/lessonPlan-topics.json");
    
    let offset = 0;
    let page = 1;

    let selectedRobot = "";
    let selectedExperience = "";
    let selectedTopic = "";

    let filtered = false;

    function applyFilters() {
        $robot = selectedRobot;
        $experience = selectedExperience;
        $topic = selectedTopic;
        
        page = 1;
        offset = 0;
    }

    function clearFilters() {
        selectedRobot = selectedExperience = selectedTopic = '';
        applyFilters();
    }

    function changePage(event) {
        const button = event.target.closest('button');
        page = parseInt(button.dataset.page);
        offset = (page - 1) * $perPage;
    }

    onMount(async () => {
		const res = await fetch(`/lessonPlans.json`);
        $lessonPlans = await res.json();
        offset = (page - 1) * $perPage;
        applyFilters();
	});
</script>

<div class="[ flow-lg ]">
    <div class="[ filter ] [ flow ]">
        <h2>Filter Lesson Plans</h2>
        <form class="[ filters ]">
            <label class="[ label ]" for="robot">
                Robot: 
                <select class="[ select ]" bind:value={selectedRobot} name="robot" id="robot">
                    <option value="">Any Robot</option>
                    {#each robots as r}
                    <option value={r}>{r}</option>
                    {/each}
                </select>
            </label>
            <label class="[ label ]" for="experience">
                Experience:        
                <select class="[ select ]" bind:value={selectedExperience} name="experience" id="experience">
                    <option value="">Any Level</option>
                    {#each levels as l}
                    <option value={l}>{l}</option>
                    {/each}
                </select>
            </label>
            <label class="[ label ]" for="topic">
                Topic:
                <select class="[ select ]" bind:value={selectedTopic} name="topic" id="topic">
                    <option value="">Any Topic</option>
                    {#each topics as t}
                    <option value={t}>{t}</option>
                    {/each}
                </select>
            </label>
            <button on:click|preventDefault={applyFilters} class="[ button ] [ button--primary ]" id="apply" type="submit">Apply Filters</button>
            <button on:click|preventDefault={clearFilters} class="[ button ]" id="clear" type="submit">Clear Filters</button>
        </form>
        <div class="[ alert ] [ { $filteredLessonPlans.length > 0 ? 'alert--info' : 'alert--error' } ]" role="alert">
        {#if filtered && $filteredLessonPlans.length === 0}
        <p>No lesson plans matched these filters.</p>
        {:else if $filteredLessonPlans.length < $lessonPlans.length}
        <p>Showing <strong>{$filteredLessonPlans.length}</strong> of <strong>{$lessonPlans.length}</strong> activities{#if $pageCount > 1}, page <strong>1</strong> of <strong>{$pageCount}</strong>{/if}.</p>
        {/if}
        </div>
    </div>
    <div class="[ grid ]" aria-label="lesson plans">
        {#if $filteredLessonPlans.length > 0}
            {#each $filteredLessonPlans.slice(offset, offset + $perPage) as item}
                <article class="[ card ]">
                    <div class="[ card__image ]">
                        <svg viewBox="0 0 570 393" class="placeholder"><rect width="570" height="393"></rect></svg>
                    </div>
                    <div class="[ card__content ] [ flow ]">
                        <h3><a href="{ item.url }">{ item.title }</a></h3>
                        <p class="metadata"><span class="[ tag ]">{ item.robot }</span> &middot; <span class="[ tag ]">{ item.experience }</span> &middot; <span class="[ tag ]">{ item.topic }</span></p>
                        {#if item.description }
                        <p>{ item.description }</p>
                        {/if}
                    </div>
                </article>
            {/each}
        {/if}
    </div>
    {#if $filteredLessonPlans.length > $perPage}
    <nav class="[ pagination ]" aria-label="pagination">
        <ul role="list">
        {#if offset > 0}
            <li><button class="[ link ]" on:click|preventDefault={changePage} data-page={page - 1}><span aria-hidden="true">&larr;</span><span class="[ visually-hidden ]">previous</span></button></li>
        {/if}
        {#each $pages as p, i}
        <li><button class="[ link ]{ page === i + 1 ? '[ link--current ]' : '' }" on:click|preventDefault={changePage} data-page={i + 1}>{i + 1}</button></li>
        {/each}
        {#if $filteredLessonPlans.length > offset + $perPage}
            <li><button class="[ link ]" on:click|preventDefault={changePage} data-page={page + 1}><span class="[ visually-hidden ]">next</span><span aria-hidden="true">&rarr;</span></button></li>
        {/if}
        </ul>
    </nav>
    {/if}
</div>
