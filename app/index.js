'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var ApuCodeigniterGenerator = yeoman.Base.extend({
    init: function() {
        this.pkg = require('../package.json');

        this.on('end', function() {
            if (!this.options['skip-install']) {
                this.installDependencies();
                this.spawnCommand('composer', ['install']);
            }
        });
    },

    askFor: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous ApuCodeigniter3 generator!'));

        var prompts = [{
            name: 'authorName',
            message: 'Author\'s name?',
            default: 'Author\'s Name'
        }, {
            name: 'authorEmail',
            message: 'Author\'s email?',
            default: 'user@domain.com'
        }, {
            name: 'projectSlug',
            message: 'Project slug?',
            default: 'web',
            validate: function(input) {
                return input !== '' ? true : 'Must not be blank!';
            }
        }];

        this.prompt(prompts, function(props) {
            this.authorName = (props.authorName !== '') ? props.authorName : 'Author\'s Name';
            this.authorEmail = (props.authorEmail !== '') ? props.authorEmail : 'user@domain.com';
            this.projectSlug = (props.projectSlug !== '') ? props.projectSlug : 'web';

            done();
        }.bind(this));
    },

    app: function() {
        this.directory('codeigniter/application', 'application');
        this.directory('codeigniter/system', 'system');
        this.directory('assets', 'assets');

        this.copy('_package.json', 'package.json');
        this.copy('_bower.json', 'bower.json');
        this.copy('_composer.json', 'composer.json');
        this.copy('_htaccess', '.htaccess');
        this.copy('_bowerrc', '.bowerrc');
        this.copy('_slugignore', '.slugignore');
        this.copy('_gitignore', '.gitignore');
        this.copy('_README.md', 'README.md');
        this.copy('_robots.txt', 'robots.txt');
        this.copy('_Gruntfile.js', 'Gruntfile.js');

        this.template('codeigniter/index.php', 'index.php');
        this.copy('codeigniter/license.txt', 'license.txt');
    },

    projectfiles: function() {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
    }
});

module.exports = ApuCodeigniterGenerator;
