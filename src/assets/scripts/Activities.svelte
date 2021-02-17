<script>
    import { onMount } from 'svelte';

    import { activities, filteredActivities, perPage, pages, pageCount, type, experience, subject } from './activitiesStore.module.js'

    const decodeEntities = require('./utils/decodeEntities.js');

    let types = {
        "unplugged": "Unplugged",
        "on-screen": "On-Screen",
        "hybrid": "Hybrid"
    };
    
    let levels = require("../../_data/levels.json");
    let subjects = require("../../_data/activity-subjects.json");
    
    let offset = 0;
    let page = 1;
    let hash = window.location.hash.replace('#', '');

    let selectedType = Object.keys(types).includes(hash) ? types[hash] : "";
    let selectedExperience = "";
    let selectedSubject = "";

    let filtered = false;

    function applyFilters() {
        $type = selectedType;
        $experience = selectedExperience;
        $subject = selectedSubject;
        
        page = 1;
        offset = 0;
    }

    function clearFilters() {
        selectedType = selectedExperience = selectedSubject = '';
        applyFilters();
    }

    function changePage(event) {
        const button = event.target.closest('button');
        page = parseInt(button.dataset.page);
        offset = (page - 1) * $perPage;
    }

    onMount(async () => {
		const res = await fetch(`/activities.json`);
        $activities = await res.json();
        offset = (page - 1) * $perPage;
        applyFilters();
	});
</script>

<div class="[ flow-lg ]">
    <div class="[ filter ] [ flow ]">
        <h2>Filter Activities</h2>
        <form class="[ filters ]">
            <label class="[ label ]" for="type">
                Type: 
                <select class="[ select ]" bind:value={selectedType} name="type" id="type">
                    <option value="">Any Type</option>
                    {#each Object.values(types) as t}
                    <option value={t}>{t}</option>
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
            <label class="[ label ]" for="subject">
                Subject:
                <select class="[ select ]" bind:value={selectedSubject} name="subject" id="subject">
                    <option value="">Any Subject</option>
                    {#each subjects as s}
                    <option value={s}>{s}</option>
                    {/each}
                </select>
            </label>
            <button on:click|preventDefault={applyFilters} class="[ button ] [ button--primary ]" id="apply" type="submit">Apply Filters</button>
            <button on:click|preventDefault={clearFilters} class="[ button ]" id="clear" type="submit">Clear Filters</button>
        </form>
        <div class="[ alert ] [ { $filteredActivities.length > 0 ? 'alert--info' : 'alert--error' } ]" role="alert">
        {#if filtered && $filteredActivities.length === 0}
        <p>No activities matched these filters.</p>
        {:else if $filteredActivities.length < $activities.length}
        <p>Showing <strong>{$filteredActivities.length}</strong> of <strong>{$activities.length}</strong> activities{#if $pageCount > 1}, page <strong>1</strong> of <strong>{$pageCount}</strong>{/if}.</p>
        {/if}
        </div>
    </div>
    <div class="[ grid ]" aria-label="activities">
        {#if $filteredActivities.length > 0}
            {#each $filteredActivities.slice(offset, offset + $perPage) as item}
                <article class="[ card ]">
                    <div class="[ card__image ]">
                        <svg viewBox="0 0 570 393" class="placeholder"><rect width="570" height="393"></rect></svg>
                    </div>
                    <div class="[ card__content ] [ flow ]">
                        <h3><a href="{ item.url }">{ item.title }</a></h3>
                        <p class="metadata"><span class="[ tag ]">{ item.type }</span> &middot; <span class="[ tag ]">{ item.experience }</span> &middot; <span class="[ tag ]">{ item.subject }</span></p>
                        {#if item.description }
                        <p>{ decodeEntities(item.description) }</p>
                        {/if}
                    </div>
                </article>
            {/each}
        {/if}
    </div>
    {#if $filteredActivities.length > $perPage}
    <nav class="[ pagination ]" aria-label="pagination">
        <ul role="list">
        {#if offset > 0}
            <li><button class="[ link ]" on:click|preventDefault={changePage} data-page={page - 1}><span aria-hidden="true">&larr;</span><span class="[ visually-hidden ]">previous</span></button></li>
        {/if}
        {#each $pages as p, i}
        <li><button class="[ link ]{ page === i + 1 ? '[ link--current ]' : '' }" on:click|preventDefault={changePage} data-page={i + 1}>{i + 1}</button></li>
        {/each}
        {#if $filteredActivities.length > offset + $perPage}
            <li><button class="[ link ]" on:click|preventDefault={changePage} data-page={page + 1}><span class="[ visually-hidden ]">next</span><span aria-hidden="true">&rarr;</span></button></li>
        {/if}
        </ul>
    </nav>
    {/if}
</div>
