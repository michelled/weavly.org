"use strict";

// const eleventyImage = require("@11ty/eleventy-img");

module.exports = async (src, alt) => {
    // const metadata = await eleventyImage(src, {
    //     outputDir: "./dist/assets/media/",
    //     urlPath: "/assets/media/",
    //     widths: [320, 640],
    //     formats: ["avif", "jpeg"]
    // });

    // const imageAttributes = {
    //     alt,
    //     sizes,
    //     loading: "lazy",
    //     decoding: "async"
    // };

    // return eleventyImage.generateHTML(metadata, imageAttributes);

    return `<picture><img src="${src}" alt="${alt}" /></picture>`;
};
