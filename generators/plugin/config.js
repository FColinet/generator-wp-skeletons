module.exports = {
  dirsToCreate: [
    "src/images",
    "src/fonts",
    "src/languages",
    "src/common",
    "src/includes",
    "src/modules",
    "src/modules/main",
    "src/modules/secondary",
    "src/vendors"
  ],
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
    },
    {
      input: "common/footer.php",
      output: "src/common/footer.php"
    }
  ],
  filesToRender: [
    {
      input: "package.json",
      output: "package.json",
      nameReplace: true
    },
    {
      input: "docker-compose.yml",
      output: "docker-compose.yml",
      nameReplace: false
    },
    {
      input: "wp.js",
      output: "wp.js",
      nameReplace: false
    },
    {
      input: "README.md",
      output: "README.md",
      nameReplace: false
    },
    {
      input: "%name%.php",
      output: "src/%name%.php",
      nameReplace: true
    },
    {
      input: "style.scss",
      output: "src/style.scss",
      nameReplace: false
    },
    {
      input: "fonts.scss",
      output: "src/fonts.scss",
      nameReplace: false
    },
    {
      input: "mixins.scss",
      output: "src/mixins.scss",
      nameReplace: false
    },
    {
      input: "menu.scss",
      output: "src/menu.scss",
      nameReplace: false
    },
    {
      input: "common/header.php",
      output: "src/common/header.php",
      nameReplace: false
    },
    {
      input: "includes/class_%name%_module.php",
      output: "src/includes/class_%name%_module.php",
      nameReplace: true
    },
    {
      input: "includes/class_%name%_secondary.php",
      output: "src/includes/class_%name%_secondary.php",
      nameReplace: true
    },
    {
      input: "modules/main/index.php",
      output: "src/modules/main/index.php",
      nameReplace: false
    },
    {
      input: "modules/secondary/index.php",
      output: "src/modules/secondary/index.php",
      nameReplace: false
    }
  ]
};
