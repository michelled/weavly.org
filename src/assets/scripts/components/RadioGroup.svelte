<script>
import slugify from 'slugify';

export let options;
export let activeOption;
export const allValue = "All";
// Puts all allValue value in the front of the UI
export let displayedOptions = [allValue].concat(options);

const handleCheck = value => {
	activeOption = value;
};

const handleCheckPrevious = value => {
	const currentIndex = displayedOptions.indexOf(value);
	const newIndex = (currentIndex === 0) ? displayedOptions.length - 1 : currentIndex - 1;
	const newButton = document.getElementById(slugify(displayedOptions[newIndex], {lower: true}));
	newButton.focus();
	activeOption = displayedOptions[newIndex];
};

const handleCheckNext = value => {
	const currentIndex = displayedOptions.indexOf(value);
	const newIndex = (currentIndex === displayedOptions.length - 1) ? 0 : currentIndex + 1;
	const newButton = document.getElementById(slugify(displayedOptions[newIndex], {lower: true}));
	newButton.focus();
	activeOption = displayedOptions[newIndex];
}

import RadioGroupButton from './RadioGroupButton.svelte';

</script>

<div class="[ radio-group ]">
	{#each displayedOptions as option}
	<RadioGroupButton id={slugify(option, {lower: true})} checked={activeOption === option ? 'true' : 'false'} label={option} on:check={(event) => handleCheck(event.detail.label)} on:checkPrevious={(event) => handleCheckPrevious(event.detail.label)} on:checkNext={(event) => handleCheckNext(event.detail.label)} />
	{/each}
</div>
