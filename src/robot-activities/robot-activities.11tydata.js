"use strict";

const slugify = require("../../node_modules/eleventy-plugin-fluid/src/filters/slug-filter.js");

module.exports = {
    eleventyComputed: {
        robot: data => data.tags[0],
        permalink: function (data) {
            return `/learn/robots/${slugify(data.robot)}/${slugify(data.title)}/`;
        }
    },
    layout: "layouts/robot-activity"

};
