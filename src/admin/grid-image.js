/* global CMS */

"use strict";

CMS.registerEditorComponent({
    id: "grid-image",
    label: "Grid Image",
    fields: [
        {
            name: "src",
            label: "Image",
            widget: "image"
        },
        {
            name: "alt",
            label: "Alt Text",
            widget: "string"
        },
        {
            name: "content",
            label: "Content",
            widget: "markdown"
        }
    ],
    pattern: /^{% gridImage "([\s\S]*?)", "([\s\S]*?)" %}([\s\S]*?){% endgridImage %}/,
    fromBlock: function (match) {
        return {
            src: match[1],
            alt: match[2],
            content: match[3]
        };
    },
    toBlock: function (obj) {
        const {src, alt, content} = obj;
        return `{% gridImage "${src}", "${alt}" %}\n${content}\n{% endgridImage %}`;
    },
    toPreview: function (obj, getAsset, fields) {
        const {src, alt, content} = obj;
        const imageField = fields.find(f => f.get("widget") === "image");
        src = getAsset(src, imageField);
        const md = window.markdownit();
        content = content ? md.render(obj.content) : "";
        return `<div class="grid__image flow"><div class="grid__image__wrapper" role="image" aria-label="${alt}" style="background-image: url(${src}?nf_resize=fit&w=320&h=310);"></div><div class="grid__image__content">${content}</div></div>`;
    }
});
