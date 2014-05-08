grunt-diff-copy [![Build Status](https://travis-ci.org/simshanith/grunt-diff-copy.svg?branch=master)](https://travis-ci.org/simshanith/grunt-diff-copy) [![devDependency Status](https://david-dm.org/simshanith/grunt-diff-copy/dev-status.svg)](https://david-dm.org/simshanith/grunt-diff-copy#info=devDependencies)
===============

Compares source &amp; destination files before calling [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy).

Currently compatible with grunt-contrib-copy@0.5.0.

[![NPM](https://nodei.co/npm/grunt-diff-copy.png?downloads=true&stars=true)](https://nodei.co/npm/grunt-diff-copy/)

Tests & much of the Gruntfile taken from `grunt-contrib-copy`. Extensive tests of `grunt-diff-copy`'s actual functionality are planned.

## Overview

Developed with [grunt-newer](https://github.com/tschaub/grunt-newer) integration in mind, `diffCopy` will only write to a destination file if its contents actually differ from the source. By filtering, "last modified" times are preserved on unchanged files, allowing `grunt-newer` to do its thing.

```shell
grunt diffCopy newer:myTask
```

The `diffCopy` task delegates to `grunt-contrib-copy`, and requires no other configuration. Just specify `diffCopy` instead of `copy` when running tasks.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-copy --save-dev
npm install grunt-diff-copy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-diff-copy');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-copy/tree/grunt-0.3-stable).*

