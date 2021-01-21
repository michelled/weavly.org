<script>
    import { onMount } from 'svelte';

    import { url, activities, filteredActivities, pages, pageCount, type, experience, subject } from './activitiesStore.module.js'

    let offset = 0;
    let params = new URLSearchParams(window.location.search);
    let page = parseInt(params.get('page')) || 1;

    let selectedType = params.get('type') || "";
    let selectedExperience = params.get('experience') || "";
    let selectedSubject = params.get('subject') || "";

    let filtered = false;

    let types = [
        "Unplugged",
        "On-Screen",
        "Hybrid"
    ];
    
    let levels = require("../../_data/activity-levels.json");
    let subjects = require("../../_data/activity-subjects.json");

    /*!
    * Build a query string from an object of data
    * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
    * @param  {Object} data The data to turn into a query string
    * @return {String}      The query string
    */
    var buildQuery = function (data) {
        if (typeof (data) === 'string') return data;
        var query = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
        }
        return query.join('&');
    };

    function applyFilters() {
        let queryParams = {};

        if (selectedType) {
            queryParams.type = selectedType;
        }

        if (selectedExperience) {
            queryParams.experience = selectedExperience;
        }

        if (selectedSubject) {
            queryParams.subject = selectedSubject;
        }

        queryParams.page = 1;

        const href = `?${buildQuery(queryParams)}`;

        $type = selectedType;
        $experience = selectedExperience;
        $subject = selectedSubject;

        history.pushState(href, '', href);
        
        page = 1;
        offset = 0;
    }

    function clearFilters() {
        selectedType = selectedExperience = selectedSubject = '';
        applyFilters();
    }

    function changePage(event) {
        const link = event.target.closest('a');
        const href = link.href;
        history.pushState(href, '', href);
        page = parseInt(link.dataset.page);
        offset = (page - 1) * 10;
    }

    onMount(async () => {
		const res = await fetch(`/activities.json`);
        $activities = await res.json();
        offset = (page - 1) * 10;
        applyFilters();
	});
</script>

<div class="my-12 space-y-4 filter">
    <h2>Filter Activities</h2>
    <div class="space-y-4 lg:space-y-0 lg:flex lg:justify-start lg:items-center">
        <label class="block lg:flex lg:items-center" for="type">
            Type: 
            <select bind:value={selectedType} class="py-1 ml-2 border border-black rounded focus:outline-none focus:ring-2" name="type" id="type">
                <option value="">Any Type</option>
                {#each types as t}
				<option value={t}>{t}</option>
				{/each}
            </select>
        </label>
        <label class="block lg:flex lg:items-center lg:ml-4" for="experience">
            Experience:        
            <select bind:value={selectedExperience} class="py-1 ml-2 border border-black rounded focus:outline-none focus:ring-2" name="experience" id="experience">
                <option value="">Any Level</option>
                {#each levels as l}
				<option value={l}>{l}</option>
				{/each}
            </select>
        </label>
        <label class="block lg:flex lg:items-center lg:ml-4" for="subject">
            Subject:
            <select bind:value={selectedSubject} class="py-1 ml-2 border border-black rounded focus:outline-none focus:ring-2" name="subject" id="subject">
                <option value="">Any Subject</option>
                {#each subjects as s}
				<option value={s}>{s}</option>
				{/each}
            </select>
        </label>
        <button on:click={applyFilters} class="px-2 py-1 font-semibold border border-black rounded lg:ml-4 focus:outline-none focus:ring-2" id="apply" type="button">Apply Filters</button>
        <button on:click={clearFilters} class="px-2 py-1 border border-black rounded lg:ml-auto focus:outline-none focus:ring-2" id="clear" type="button">Clear Filters</button>
    </div>
    <div class="pt-2" role="alert">
    {#if $filteredActivities.length === 0}
    <p class="mt-12">No activities matched these filters.</p>
    {:else if $filteredActivities.length < $activities.length}
    <p>Showing <strong>{$filteredActivities.length}</strong> of <strong>{$activities.length}</strong> activities{#if $pageCount > 1}, page <strong>1</strong> of <strong>{$pageCount}</strong>{/if}.</p>
    {/if}
    </div>
</div>
<div class="grid gap-6 my-12 activities md:grid-cols-2">
    <h2 class="sr-only">Activities</h2>
    {#if $filteredActivities.length > 0}
        {#each $filteredActivities.slice(offset, offset + 10) as item}
            <article class="relative border border-black card entry focus-within:ring-2">
                <svg viewBox="0 0 570 393" class="w-auto max-w-full"><rect width="570" height="393" class="fill-current"></rect></svg>
                <div class="p-4 space-y-4">
                    <h3><a href="{ item.url }">{ item.title }</a></h3>
                    <p class="metadata">{ item.type } &middot; { item.experience } &middot; { item.subject }</p>
                    {#if item.description }
                    <p>{ item.description }</p>
                    {/if}
                </div>
            </article>
        {/each}
    {/if}
</div>
{#if $filteredActivities.length > 10}
<nav class="w-full mb-12 pagination" aria-label="pagination">
    <ul class="flex flex-row items-center justify-center w-full">
    {#if offset > 0}
        <li class="ml-2"><a on:click|preventDefault={changePage} class="p-2" href={window.location.search.replace(/page=([0-9])*/g, `page=${page - 1}`)} data-page={page - 1}><span aria-hidden="true">&larr;</span><span class="sr-only">previous</span></a></li>
    {/if}
    {#each $pages as p, i}
    <li class="ml-2"><a on:click|preventDefault={changePage} class="{offset === p ? "p-2 text-white bg-black" : "p-2"}" href={window.location.search.replace(/page=([0-9])*/g, `page=${i + 1}`)} data-page={i + 1}>{i + 1}</a></li>
    {/each}
    {#if $filteredActivities.length > offset + 10}
        <li class="ml-2"><a on:click|preventDefault={changePage} class="p-2" href={window.location.search.replace(/page=([0-9])*/g, `page=${page + 1}`)} data-page={page + 1}><span class="sr-only">next</span><span aria-hidden="true">&rarr;</span></a></li>
    {/if}
    </ul>
</nav>
{/if}
