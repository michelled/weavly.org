<script>
    import { onMount } from 'svelte';

    import { events, filteredEvents, filtered, perPage, pageCount, pages, category } from './eventsStore.module.js'

    import RadioGroup from './components/RadioGroup.svelte';

    let categories = {
        conferences: "Conferences",
        workshops: "Workshops",
        talks: "Talks",
        camps: "Camps"
    };
     
    let offset = 0;
    let page = 1;

    // @see https://stackoverflow.com/a/31615643
    function getOrdinal (n) {
        const s = ["th", "st", "nd", "rd"],
            v = n % 100;

        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    function formatDate(value) {
        const dateObject = new Date(new Date(value).toUTCString());

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return `${months[dateObject.getMonth()]} ${getOrdinal(dateObject.getDate())}, ${dateObject.getFullYear()}`;
    }
    
    function changePage(event) {
        const button = event.target.closest('button');
        page = parseInt(button.dataset.page);
        offset = (page - 1) * $perPage;
    }

    onMount(async () => {
		const res = await fetch(`/events.json`);
        $events = await res.json();
        offset = (page - 1) * $perPage;
	});
</script>

<div class="[ flow-lg ]">
    <div class="[ filter ] [ flow ]">
        <h2>Filter Events</h2>
        <form class="[ filters ]">
            <RadioGroup options={Object.values(categories)} bind:activeOption={$category} />
        </form>
        <div class="[ alert ] [ { $filteredEvents.length > 0 ? 'alert--info' : 'alert--error' } ]" role="alert">
        {#if $filtered && $filteredEvents.length === 0}
        <p>No events matched these filters.</p>
        {:else if $filteredEvents.length < $events.length}
        <p>Showing <strong>{$filteredEvents.length}</strong> of <strong>{$events.length}</strong> activities{#if $pageCount > 1}, page <strong>1</strong> of <strong>{$pageCount}</strong>{/if}.</p>
        {/if}
        </div>
    </div>
    <div class="[ flow-md ]" aria-label="events">
        {#if $filteredEvents.length > 0}
            {#each $filteredEvents.slice(offset, offset + $perPage) as item}
                <article class="[ event ] [ two:three ]">
                    <div class="[ three:two__three ]">
                        <svg viewBox="0 0 570 380" class="placeholder"><rect width="570" height="380"></rect></svg>
                    </div>
                    <div class="[ three:two__two ] [ flow ]">
                        <h3><a href="{ item.url }">{ item.title }</a></h3>
                        <p class="[ metadata ]"><span class="[ tag ]">{ item.category }</span> &middot; <span class="[ date ]" itemprop="startDate" content="{ new Date(item.date).toISOString() }">{ formatDate(item.date) }</span></p>
                        {#if item.description }
                        <p>{ item.description }</p>
                        {/if}
                    </div>
                </article>
            {/each}
        {/if}
    </div>
    {#if $filteredEvents.length > $perPage}
    <nav class="[ pagination ]" aria-label="pagination">
        <ul role="list">
        {#if offset > 0}
            <li><button class="[ link ]" on:click|preventDefault={changePage} data-page={page - 1}><span aria-hidden="true">&larr;</span><span class="[ visually-hidden ]">previous</span></button></li>
        {/if}
        {#each $pages as p, i}
        <li><button class="[ link ]{ page === i + 1 ? '[ link--current ]' : '' }" on:click|preventDefault={changePage} data-page={i + 1}>{i + 1}</button></li>
        {/each}
        {#if $filteredEvents.length > offset + $perPage}
            <li><button class="[ link ]" on:click|preventDefault={changePage} data-page={page + 1}><span class="[ visually-hidden ]">next</span><span aria-hidden="true">&rarr;</span></button></li>
        {/if}
        </ul>
    </nav>
    {/if}
</div>
