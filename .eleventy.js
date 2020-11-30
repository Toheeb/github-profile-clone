module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("src/styles")
    eleventyConfig.addPassthroughCopy("src/images")
    eleventyConfig.addPassthroughCopy("src/scripts")

    return {
        dir: {
            input: "src",
        }
    }
}