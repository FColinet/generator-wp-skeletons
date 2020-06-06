"use strict";

const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const slug = require("underscore.string");
const mkdirp = require("mkdirp");

const config = require("./config");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ${chalk.red("generator-wp-skeletons")} generator!`)
    );

    const prompts = [
      {
        type: "text",
        name: "name",
        message: "Plugin name :",
        default: path.basename(process.cwd())
      },
      {
        type: "text",
        name: "description",
        message: "Plugin description :",
        default: ""
      },
      {
        type: "text",
        name: "author",
        message: "Plugin author :",
        default: ""
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  configuring() {
    const trimName = this.props.name
      .trim()
      .replace(/\s*/g, "")
      .toLowerCase();
    this.templateValues = {
      name: this.props.name,
      kebabName: slug.slugify(this.props.name),
      capitalizeName: slug(trimName)
        .capitalize()
        .value(),
      lowercaseName: trimName,
      uppercaseName: trimName.toUpperCase(),
      description: this.props.description,
      author: this.props.author
    };
  }

  default() {
    mkdirp(this.templateValues.lowercaseName);
    this.destinationRoot(
      this.destinationPath(this.templateValues.lowercaseName)
    );
  }

  writing() {
    const copy = (input, output) => {
      this.fs.copy(this.templatePath(input), this.destinationPath(output));
    };

    const copyTpl = (input, output, data) => {
      this.fs.copyTpl(
        this.templatePath(input),
        this.destinationPath(output),
        data
      );
    };

    config.dirsToCreate.forEach(dir => {
      mkdirp(dir);
    });
    config.filesToCopy.forEach(file => {
      copy(file.input, file.output);
    });
    config.filesToRender.forEach(file => {
      copyTpl(
        file.input,
        file.nameReplace
          ? file.output.replace(/%name%/g, this.templateValues.lowercaseName)
          : file.output,
        this.templateValues
      );
    });
  }

  install() {
    // Install dependancies
    this.npmInstall([
      "gulp",
      "gulp-clean-css",
      "gulp-file",
      "gulp-path",
      "gulp-rename",
      "gulp-sass",
      "gulp-watch",
      "gulp-zip",
      "del",
      "file-system",
      "node-sass"
    ]);
  }

  end() {
    this.log(
      `\nExecute with\n  # cd ${this.templateValues.lowercaseName}\n  # docker-compose up -d\n  # npm start`
    );
  }
};
