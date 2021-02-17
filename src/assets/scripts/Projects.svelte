<script>
    import { onMount } from 'svelte';

    import { projects, filteredProjects, filtered, perPage, pageCount, pages, category } from './projectsStore.module.js'

    import RadioGroup from './components/RadioGroup.svelte';

    const decodeEntities = require('./utils/decodeEntities.js');

    let categories = [
        "Coding",
        "Robotics",
        "Computational Thinking"
    ];
     
    let offset = 0;
    let page = 1;
    
    function changePage(project) {
        const button = project.target.closest('button');
        page = parseInt(button.dataset.page);
        offset = (page - 1) * $perPage;
    }

    onMount(async () => {
		const res = await fetch(`/projects.json`);
        $projects = await res.json();
        offset = (page - 1) * $perPage;
	});
</script>

<div class="[ flow-lg ]">
    <div class="[ filter ] [ flow ]">
        <h2>Filter Projects</h2>
        <div class="[ filters ]">
            <RadioGroup options={categories} bind:activeOption={$category} />
        </div>
        <div class="[ alert ] [ { $filteredProjects.length > 0 ? 'alert--info' : 'alert--error' } ]" role="alert">
        {#if $filtered && $filteredProjects.length === 0}
        <p>No projects matched these filters.</p>
        {:else if $filteredProjects.length < $projects.length}
        <p>Showing <strong>{$filteredProjects.length}</strong> of <strong>{$projects.length}</strong> activities{#if $pageCount > 1}, page <strong>1</strong> of <strong>{$pageCount}</strong>{/if}.</p>
        {/if}
        </div>
    </div>
    <div class="[ flow-md ]" aria-label="projects">
        {#if $filteredProjects.length > 0}
            {#each $filteredProjects.slice(offset, offset + $perPage) as item}
                <article class="[ project ] [ two:three ]">
                    <div class="[ three:two__three ]">
                        <svg viewBox="0 0 570 380" class="placeholder"><rect width="570" height="380"></rect></svg>
                    </div>
                    <div class="[ three:two__two ] [ flow ]">
                        <h3>{ item.title }</h3>
                        <p class="[ metadata ]"><span class="[ tag ]">{ item.category }</span></p>
                        {#if item.description }
                        <p>{ decodeEntities(item.description) }</p>
                        {/if}
                        <p><a href={ item.link} rel="external">Visit Website<span class="[ visually-hidden ]"> for { item.title }</span></a></p>
                    </div>
                </article>
            {/each}
        {/if}
    </div>
    {#if $filteredProjects.length > $perPage}
    <nav class="[ pagination ]" aria-label="pagination">
        <ul role="list">
        {#if offset > 0}
            <li><button class="[ link ]" on:click|preventDefault={changePage} data-page={page - 1}><span aria-hidden="true">&larr;</span><span class="[ visually-hidden ]">previous</span></button></li>
        {/if}
        {#each $pages as p, i}
        <li><button class="[ link ]{ page === i + 1 ? '[ link--current ]' : '' }" on:click|preventDefault={changePage} data-page={i + 1}>{i + 1}</button></li>
        {/each}
        {#if $filteredProjects.length > offset + $perPage}
            <li><button class="[ link ]" on:click|preventDefault={changePage} data-page={page + 1}><span class="[ visually-hidden ]">next</span><span aria-hidden="true">&rarr;</span></button></li>
        {/if}
        </ul>
    </nav>
    {/if}
</div>
