"use strict";

module.exports = (caption, src, alt) => {
    return `<div class="grid__image flow">
    <div class="grid__image__wrapper" role="image" aria-label="${alt}" style="background-image: url(${src}?nf_resize=fit&w=320&h=310);"></div>
    <div class="grid__image__content">${caption}</div>
</div>`;
};
