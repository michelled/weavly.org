/* global CMS */

"use strict";

CMS.registerEditorComponent({
    id: "grid",
    label: "Grid",
    fields: [
        {
            name: "columns",
            label: "Columns",
            widget: "number",
            min: 2,
            max: 4
        },
        {
            name: "content",
            label: "Content",
            widget: "markdown"
        }
    ],
    pattern: /^{% grid "([\s\S]*?)" %}([\s\S]*?){% endgrid %}/,
    fromBlock: function (match) {
        return {
            columns: match[1],
            content: match[2]
        };
    },
    toBlock: function (obj) {
        return `{% grid "${obj.columns}" %}\n${obj.content}\n{% endgrid %}`;
    },
    toPreview: function (obj) {
        var md = window.markdownit();
        var columns = obj.columns ? obj.columns : 2;
        var content = obj.content ? md.render(obj.content) : "";
        return `<div class="grid grid--${columns}">${content}</div>`;
    }
});
