"use strict";

module.exports = {
    purge: {
        content: [
            "./src/**/*.njk"
        ],
        options: {
            safelist: ["text-indigo-500"] // TODO: Remove this later.
        }
    },
    darkMode: "class",
    theme: {
        extend: {}
    },
    variants: {
        extend: {}
    },
    plugins: []
};
