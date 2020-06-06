module.exports = {
  dirsToCreate: ["src/fonts", "src/images", "src/languages"],
  filesToCopy: [
    {
      input: "editorconfig",
      output: ".editorconfig"
    },
    {
      input: "gitignore",
      output: ".gitignore"
    },
    {
      input: "gulpfile.js",
      output: "gulpfile.js"
    }
  ],
  filesToRender: [
    {
      input: "package.json",
      output: "package.json"
    },
    {
      input: "docker-compose.yml",
      output: "docker-compose.yml"
    },
    {
      input: "README.md",
      output: "README.md"
    },
    {
      input: "style.scss",
      output: "src/style.scss"
    },
    {
      input: "responsive.scss",
      output: "src/responsive.scss"
    },
    {
      input: "reset.scss",
      output: "src/reset.scss"
    },
    {
      input: "screenshot.jpg",
      output: "src/screenshot.jpg"
    }
  ],
  pages: [
    "404",
    "archive",
    "comments",
    "content",
    "footer",
    "functions",
    "header",
    "home",
    "index",
    "page",
    "search",
    "single"
  ]
};
