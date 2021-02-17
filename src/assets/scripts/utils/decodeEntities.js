"use strict";

/** See https://gomakethings.com/decoding-html-entities-with-vanilla-javascript/ */

module.exports = function (html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};
