'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

let pjson = require('../../package.json')
const version = pjson.version
const pkg = pjson.name

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    this.argument("name", { type: String, required: true });

    // And you can then access it later; e.g.
    this.log(this.options.name);
  }

	/*prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the legendary ${chalk.red('generator-react-scss-component')} generator!`)
    );

    const prompts = [
			      {
        type: "input",
        name: "name",
        message: "What is the name of the component ?",
				default: 'NewComponent' //this.appname // Default to current folder name
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
	}*/

	writing() {
		/* Setting up variables */
		const { name:fullname } = this.options
    const splitName = fullname.split(/[|\/]+/)
		const name = splitName[splitName.length - 1]
		
		/* Copying */
		this.fs.copyTpl(
			this.templatePath('story.js'),
			this.destinationPath(name + '.stories.js'),
			{ fullname,
				name,
        pkg,
        version
			}
    );

  }

  install() {
		//this.installDependencies();
  }
};
