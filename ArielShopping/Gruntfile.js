//Automation with Grunt
/*
    We’ll be rolling up our logic tests, cross-page tests, linting, and link checking into a single 
    command with Grunt. Why not page tests? This is possible using a headless browser like PhantomJS
    or Zombie, but the configuration is complicated and beyond the scope of this book. 
    Furthermore, browser tests are usually designed to be run as you work on an individual page, 
    so there isn’t quite as much value in rolling them together with the rest of your tests.
*/

/*
    First, you’ll need to install the Grunt command line, and Grunt itself: 
        sudo npm install -g grunt-cli
        npm install --save-dev grunt
    Grunt relies on plugins to get the job done (see the Grunt plugins list for all available plugins). 
    We’ll need plugins for Mocha, JSHint, and LinkChecker. As I write this, there’s no plugin for LinkChecker, 
    so we’ll have to use a generic plugin that executes arbitrary shell commands. So first we install all the necessary plugins:
        npm install --save-dev grunt-cafe-mocha
        npm install --save-dev grunt-contrib-jshint
        npm install --save-dev grunt-exec
*/

/*
module.exports = function(grunt){
// load plugins
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec',
    ].forEach(function(task){
        grunt.loadNpmTasks(task);
    });

// configure plugins
    grunt.initConfig({
        cafemocha: {
            all: { src: 'qa/tests-*.js', options: { ui: 'tdd' }, }
        },
        jshint: {
            app: ['app.js', 'public/js/**//*.js','lib/**//*.js'],
            qa: ['Gruntfile.js', 'public/qa/**//*.js', 'qa/**//*.js'],
        },
        exec: {
            linkchecker:
                { cmd: 'linkchecker http://localhost:3000' }
        },
    });

// register tasks
    grunt.registerTask('default', ['cafemocha','jshint','exec']);
};
*/ 

/* Code Explanation

In the section “load plugins,” we’re specifying which plugins we’ll be using, which are
the same plugins we installed via npm. Because I don’t like to have to type loadNpm
Tasks over and over again (and once you start relying on Grunt more, believe me, you
will be adding more plugins!), I choose to put them all in an array and loop over them
with forEach.
In the “configure plugins” section, we have to do a little work to get each plugin to work
properly. For the cafemocha plugin (which will run our logic and cross-browser
tests), we have to tell it where our tests are. We’ve put all of our tests in the qa
subdirectory, and named them with a tests- prefix. Note that we have to specify the tdd
interface. If you were mixing TDD and BDD, you would have to have some way to
separate them. For example, you could use prefixes tests-tdd- and tests-bdd-.
For JSHint, we have to specify what JavaScript files should be linted. Be careful here!
Very often, dependencies won’t pass JSHint cleanly, or they will be using different JSHint
settings, and you’ll be inundated with JSHint errors for code that you didn’t write. In
particular, you want to make sure the node_modules directory isn’t included, as well as
any vendor directories. Currently, grunt-contrib-jshint doesn’t allow you to exclude
files, only include them. So we have to specify all the files we want to include. I
generally break the files I want to include into two lists: the JavaScript that actually makes
up our application or website and the QA JavaScript. It all gets linted, but breaking it
up like this makes it a little easier to manager. Note that the wildcard /**/ /*means “all
files in all subdirectories.” Even though we don’t have a public/js directory yet, we will.
Implicitly excluded are the node_modules and public/vendor directories.
Lastly, we configure the grunt-exec plugin to run LinkChecker. Note that we’ve hardcoded
this plugin to use port 3000; this might be a good thing to parameterize, which
I’ll leave as an exercise for the reader.3
Finally, we “register” the tasks: this puts individual plugins into named groups. A specially
named task, default, will be the task that gets run by default, if you just type grunt.

And now we just have to make sure Grunt server is running and run Grunt
    grunt

*/

/****** Additional Knowledge ******/

//Continuous Integration (CI)
/* 
    I’ll leave you with another extremely useful QA concept: continuous integration. It’s
    especially important if you’re working on a team, but even if you’re working on your
    own, it can provide some discipline that you might otherwise lack. Basically, CI runs
    some or all of your tests every time you contribute code to a shared server. If all of the
    tests pass, nothing usually happens (you may get an email saying “good job,” depending
    on how your CI is configured). If, on the other hand, there are failures, the consequences
    are usually more…public. Again, it depends on how you configure your CI, but usually
    the entire team gets an email saying that you “broke the build.” If your integration master
    is really sadistic, sometimes your boss is also on that email list! I’ve even known teams
    that set up lights and sirens when someone breaks the build, and in one particularly
    creative office, a tiny robotic foam missile launcher fired soft projectiles at the offending
    developer! It’s a powerful incentive to run your QA toolchain before committing.
    It’s beyond the scope of this book to cover installing and configuring a CI server, but a
    chapter on QA wouldn’t be complete without mentioning it. Currently, the most popular
    CI server for Node projects is Travis CI. Travis CI is a hosted solution, which can be
    very appealing (it saves you from having to set up your own CI server). If you’re using
    GitHub, it offers excellent integration support. Jenkins, a well-established CI server, now
    has a Node plugin. JetBrains’s excellent TeamCity now offers Node plugins.
    If you’re working on a project on your own, you may not get much benefit from a CI
    server, but if you’re working on a team or an open source project, I highly recommend
    looking into setting up CI for your project.
*/